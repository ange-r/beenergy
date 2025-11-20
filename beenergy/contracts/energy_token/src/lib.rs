// ==============================================================================
// ENERGY TOKEN 
// ==============================================================================
// Token fungible que representa kWh de energía renovable.
// 
// 
// En testnet:
// - Admin = Wallet de prueba del equipo
// - Generación/consumo = Simulados desde backend
// - No hay oracles ni hardware IoT real
// 
// En mainnet:
// - Admin = Oracle que lee medidores Modbus/MQTT
// - Generación/consumo = Datos reales de sensores
// - Oracle llama mint_energy() cada 15 minutos
//
// ESTÁNDAR: SEP-41 (Soroban Token Interface)
// https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0041.md
// ==============================================================================

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Stellar Soroban Contracts ^0.4.1

#![no_std]

// ==============================================================================
// IMPORTS
// ==============================================================================
use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    Address,
    Env,
    String,
};

// OpenZeppelin Stellar - Implementación SEP-41
use stellar_macros::default_impl;
use stellar_tokens::fungible::{Base, FungibleToken};

// ==============================================================================
// ESTRUCTURA DEL CONTRATO
// ==============================================================================
/// BeEnergy Token - Token SEP-41 para energía renovable
#[contract]
pub struct EnergyToken;

// ==============================================================================
// STORAGE
// ==============================================================================
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    /// Administrador autorizado para mintear tokens
    /// 
    /// MVP Testnet: Wallet del equipo BeEnergy (para demos)
    /// Mainnet: Oracle que lee medidores IoT reales
    Admin,
}

// ==============================================================================
// IMPLEMENTACIÓN
// ==============================================================================
#[contractimpl]
impl EnergyToken {
    
    // ==========================================================================
    // INICIALIZACIÓN
    // ==========================================================================
    
    /// Constructor - Inicializa el token SEP-41
    /// 
    /// # Configuración SEP-41:
    /// - Decimals: 7 (10^7 stroops = 1 ENERGY = 1 kWh)
    /// - Name: "BeEnergy Token"
    /// - Symbol: "ENERGY"
    /// 
    /// # Argumentos
    /// * `admin` - En testnet: Wallet del equipo
    ///             En mainnet: Dirección del oracle IoT
    pub fn __constructor(env: Env, admin: Address) {
        // Configurar metadata SEP-41
        Base::set_metadata(
            &env,
            7,
            String::from_str(&env, "BeEnergy Token"),
            String::from_str(&env, "ENERGY")
        );
        
        env.storage().instance().set(&DataKey::Admin, &admin);
    }
    
    // ==========================================================================
    // FUNCIONES DE ENERGÍA 
    // ==========================================================================
    
    /// Mintea tokens cuando se genera energía solar
    /// 
    /// # Testnet:
    /// Esta función se llama desde el BACKEND con datos simulados:
    /// 
    /// ```typescript
    /// // Backend simula generación cada 15 min
    /// const mockGeneration = Math.random() * 20; // 0-20 kWh
    /// await contract.mint_energy(user, mockGeneration * 1e7);
    /// ```
    /// 
    /// # Mainnet:
    /// Oracle IoT llama esta función con datos REALES:
    /// 
    /// ```rust
    /// // Oracle lee medidor Modbus cada 15 min
    /// let real_kwh = modbus_read_meter(meter_id);
    /// contract.mint_energy(user, real_kwh * 10_000_000);
    /// ```
    /// 
    /// # Argumentos
    /// * `to` - Usuario que generó energía
    /// * `kwh_amount` - Energía en stroops (1e7 = 1 kWh)
    /// 
    /// # Seguridad
    /// - Solo el admin puede llamar esta función
    /// - En testnet: Admin = wallet del equipo
    /// - En mainnet: Admin = oracle verificado
    pub fn mint_energy(env: Env, to: Address, kwh_amount: i128) {
        // Verificar que es el admin
        let admin: Address = env.storage().instance()
            .get(&DataKey::Admin)
            .expect("Contract not initialized");
        
        admin.require_auth();
        
        // Validación
        assert!(kwh_amount > 0, "Amount must be positive");
        
        // Mintear usando SEP-41 (OpenZeppelin)
        Base::mint(&env, &to, kwh_amount);
        
        // Evento para frontend
        env.events().publish(
            (String::from_str(&env, "energy_generated"),),
            (to.clone(), kwh_amount)
        );
    }
    
    /// Quema tokens cuando se consume energía
    /// 
    /// # Testnet:
    /// Backend simula consumo cuando usuario interactúa:
    /// 
    /// ```typescript
    /// // Usuario "consume" energía en la app
    /// const consumption = 10 * 1e7; // 10 kWh
    /// await contract.burn_consumption(user, consumption);
    /// ```
    /// 
    /// # Mainnet:
    /// Sistema lee consumo real de medidor bidireccional.
    /// 
    /// # Argumentos
    /// * `from` - Usuario que consumió energía
    /// * `kwh_amount` - Energía consumida en stroops
    pub fn burn_consumption(env: Env, from: Address, kwh_amount: i128) {
        from.require_auth();
        
        assert!(kwh_amount > 0, "Amount must be positive");
        
        let balance = Base::balance(&env, &from);
        assert!(balance >= kwh_amount, "Insufficient balance");
        
        // Quemar usando SEP-41
        Base::burn(&env, &from, kwh_amount);
        
        env.events().publish(
            (String::from_str(&env, "energy_consumed"),),
            (from.clone(), kwh_amount)
        );
    }
    
    // ==========================================================================
    // FUNCIONES DE CONSULTA
    // ==========================================================================
    
    /// Balance de un usuario
    pub fn balance_of(env: Env, address: Address) -> i128 {
        Base::balance(&env, &address)
    }
    
    /// Total supply 
    pub fn total_supply(env: Env) -> i128 {
        Base::total_supply(&env)
    }
    
    /// Actualizar admin
    /// 
    /// En testnet: Cambiar wallet de prueba
    /// En mainnet: Actualizar dirección del oracle
    pub fn update_admin(env: Env, new_admin: Address) {
        let current_admin: Address = env.storage().instance()
            .get(&DataKey::Admin)
            .expect("Contract not initialized");
        
        current_admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &new_admin);
        
        env.events().publish(
            (String::from_str(&env, "admin_updated"),),
            new_admin
        );
    }
    
    /// Consultar admin actual
    pub fn get_admin(env: Env) -> Address {
        env.storage().instance()
            .get(&DataKey::Admin)
            .expect("Contract not initialized")
    }
}

// ==============================================================================
// IMPLEMENTACIÓN AUTOMÁTICA
// ==============================================================================
/// Implementa TODAS las funciones SEP-41:
/// - transfer(), approve(), allowance()
/// - name(), symbol(), decimals()
/// - balance(), total_supply()
/// 
/// Estas funciones son compatibles con:
/// ✅ Freighter Wallet (testnet y mainnet)
/// ✅ Stellar DEX
/// ✅ Cualquier app SEP-41
#[default_impl]
#[contractimpl]
impl FungibleToken for EnergyToken {
    type ContractType = Base;
}

#[cfg(test)]
mod test;
EOF