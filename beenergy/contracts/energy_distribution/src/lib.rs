#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, Env, Symbol, Vec,
};

// ============================================================================
// ERRORES
// ============================================================================

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum DistributionError {
    NotInitialized = 1,
    AlreadyInitialized = 2,
    Unauthorized = 3,
    MemberNotFound = 4,
    InsufficientEnergy = 5,
    InvalidPercent = 6,
    InvalidAmount = 7,
}

// ============================================================================
// TIPOS DE DATOS
// ============================================================================

#[contracttype]
#[derive(Clone)]
pub struct EnergyClaimed {
    pub recipient: Address,
    pub amount: i128,
}

#[contracttype]
pub enum DataKey {
    Admin,
    MemberPercent(Address),  // Almacenamiento individual por miembro
    TotalGenerated,
    LastClaimed(Address),    // Timestamp del último claim
}

// ============================================================================
// CONSTANTES
// ============================================================================

const INSTANCE_LIFETIME_THRESHOLD: u32 = 518400;  // ~30 días
const INSTANCE_BUMP_AMOUNT: u32 = 1036800;        // ~60 días

// ============================================================================
// CONTRATO
// ============================================================================

#[contract]
pub struct EnergyDistribution;

#[contractimpl]
impl EnergyDistribution {
    
    // ========================================================================
    // INICIALIZACIÓN
    // ========================================================================
    
    /// Inicializa el contrato con un administrador
    pub fn initialize(env: Env, admin: Address) -> Result<(), DistributionError> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(DistributionError::AlreadyInitialized);
        }
        admin.require_auth();

        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TotalGenerated, &0i128);

        Ok(())
    }

    // ========================================================================
    // GESTIÓN DE MIEMBROS (Solo Admin)
    // ========================================================================
    
    /// Agrega un nuevo miembro con su porcentaje de distribución
    pub fn add_member(
        env: Env,
        admin: Address,
        member: Address,
        percent: u32,
    ) -> Result<(), DistributionError> {
        admin.require_auth();

        let stored_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(DistributionError::NotInitialized)?;

        if stored_admin != admin {
            return Err(DistributionError::Unauthorized);
        }

        // Validar porcentaje
        if percent == 0 || percent > 100 {
            return Err(DistributionError::InvalidPercent);
        }

        // Almacenar cada miembro individualmente
        env.storage()
            .persistent()
            .set(&DataKey::MemberPercent(member.clone()), &percent);

        // Extender TTL
        env.storage()
            .persistent()
            .extend_ttl(
                &DataKey::MemberPercent(member),
                INSTANCE_LIFETIME_THRESHOLD,
                INSTANCE_BUMP_AMOUNT
            );

        Ok(())
    }

    /// Actualiza el porcentaje de un miembro existente
    pub fn update_member_percent(
        env: Env,
        admin: Address,
        member: Address,
        new_percent: u32,
    ) -> Result<(), DistributionError> {
        admin.require_auth();

        let stored_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(DistributionError::NotInitialized)?;

        if stored_admin != admin {
            return Err(DistributionError::Unauthorized);
        }

        if new_percent == 0 || new_percent > 100 {
            return Err(DistributionError::InvalidPercent);
        }

        // Verificar que el miembro existe
        if !env.storage().persistent().has(&DataKey::MemberPercent(member.clone())) {
            return Err(DistributionError::MemberNotFound);
        }

        env.storage()
            .persistent()
            .set(&DataKey::MemberPercent(member.clone()), &new_percent);

        env.storage()
            .persistent()
            .extend_ttl(
                &DataKey::MemberPercent(member),
                INSTANCE_LIFETIME_THRESHOLD,
                INSTANCE_BUMP_AMOUNT
            );

        Ok(())
    }

    /// Remueve un miembro del contrato
    pub fn remove_member(
        env: Env,
        admin: Address,
        member: Address
    ) -> Result<(), DistributionError> {
        admin.require_auth();

        let stored_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(DistributionError::NotInitialized)?;

        if stored_admin != admin {
            return Err(DistributionError::Unauthorized);
        }

        env.storage()
            .persistent()
            .remove(&DataKey::MemberPercent(member));

        Ok(())
    }

    // ========================================================================
    // GESTIÓN DE ENERGÍA (Solo Admin)
    // ========================================================================
    
    /// Registra nueva generación de energía
    pub fn record_generation(
        env: Env,
        admin: Address,
        kwh: i128
    ) -> Result<(), DistributionError> {
        admin.require_auth();

        let stored_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(DistributionError::NotInitialized)?;

        if stored_admin != admin {
            return Err(DistributionError::Unauthorized);
        }

        // Validar que no sea negativo
        if kwh < 0 {
            return Err(DistributionError::InvalidAmount);
        }

        let current: i128 = env.storage()
            .instance()
            .get(&DataKey::TotalGenerated)
            .unwrap_or(0i128);

        env.storage().instance().set(&DataKey::TotalGenerated, &(current + kwh));
        
        Ok(())
    }

    /// Resetea el contador de energía generada
    pub fn reset_generation(
        env: Env,
        admin: Address
    ) -> Result<(), DistributionError> {
        admin.require_auth();

        let stored_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(DistributionError::NotInitialized)?;

        if stored_admin != admin {
            return Err(DistributionError::Unauthorized);
        }

        env.storage().instance().set(&DataKey::TotalGenerated, &0i128);
        Ok(())
    }

    // ========================================================================
    // CLAIM DE ENERGÍA (Usuarios)
    // ========================================================================
    
    /// Permite a un miembro reclamar su porción de energía
    pub fn claim_energy(env: Env, member: Address) -> Result<i128, DistributionError> {
        member.require_auth();
        
        // Obtener el porcentaje del miembro
        let percent: u32 = env.storage()
            .persistent()
            .get(&DataKey::MemberPercent(member.clone()))
            .ok_or(DistributionError::MemberNotFound)?;
        
        // Obtener total de energía generada
        let total_kwh: i128 = env.storage()
            .instance()
            .get(&DataKey::TotalGenerated)
            .unwrap_or(0i128);
        
        if total_kwh <= 0 {
            return Ok(0);
        }
        
        // Calcular la cantidad que le corresponde
        let amount = total_kwh * percent as i128 / 100i128;
        
        // Emitir evento
        env.events().publish(
            (Symbol::new(&env, "energy_claimed"), &member),
            EnergyClaimed {
                recipient: member.clone(),
                amount,
            },
        );
        
        // Guardar timestamp del último claim
        env.storage()
            .temporary()
            .set(&DataKey::LastClaimed(member), &env.ledger().timestamp());
        
        Ok(amount)
    }

    // ========================================================================
    // FUNCIONES DE CONSULTA (Públicas)
    // ========================================================================
    
    /// Obtiene cuánta energía puede reclamar un miembro
    pub fn get_claimable_energy(env: Env, member: Address) -> Result<i128, DistributionError> {
        let percent: u32 = env.storage()
            .persistent()
            .get(&DataKey::MemberPercent(member))
            .ok_or(DistributionError::MemberNotFound)?;
        
        let total_kwh: i128 = env.storage()
            .instance()
            .get(&DataKey::TotalGenerated)
            .unwrap_or(0i128);
        
        Ok(total_kwh * percent as i128 / 100i128)
    }

    /// Obtiene el porcentaje de distribución de un miembro
    pub fn get_member_percent(env: Env, member: Address) -> Option<u32> {
        env.storage()
            .persistent()
            .get(&DataKey::MemberPercent(member))
    }

    /// Verifica si una dirección es miembro
    pub fn is_member(env: Env, address: Address) -> bool {
        env.storage()
            .persistent()
            .has(&DataKey::MemberPercent(address))
    }

    /// Obtiene el total de energía generada
    pub fn get_total_generated(env: Env) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::TotalGenerated)
            .unwrap_or(0i128)
    }

    /// Obtiene el timestamp del último claim de un miembro
    pub fn get_last_claimed(env: Env, member: Address) -> Option<u64> {
        env.storage()
            .temporary()
            .get(&DataKey::LastClaimed(member))
    }

    /// Obtiene la dirección del administrador
    pub fn get_admin(env: Env) -> Option<Address> {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
    }
}

// Al final de tu lib.rs, después de la implementación del contrato

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{
        testutils::Address as _,
        Address, Env,
    };

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let contract_id = env.register(EnergyDistribution, ());
        let client = EnergyDistributionClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        env.mock_all_auths();
        
        // Inicializar el contrato
        client.initialize(&admin);
        
        // Verificar que el admin fue establecido
        let stored_admin = client.get_admin();
        assert_eq!(stored_admin, Some(admin));
    }

    #[test]
    fn test_add_member() {
        let env = Env::default();
        env.mock_all_auths();
        
        let contract_id = env.register(EnergyDistribution, ());
        let client = EnergyDistributionClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let member = Address::generate(&env);
        
        // Inicializar
        client.initialize(&admin);
        
        // Agregar miembro con 25% de participación
        client.add_member(&admin, &member, &25);
        
        // Verificar que el miembro fue agregado
        assert!(client.is_member(&member));
        assert_eq!(client.get_member_percent(&member), Some(25));
    }
}