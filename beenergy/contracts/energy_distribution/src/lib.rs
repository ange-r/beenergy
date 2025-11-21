#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Vec};

#[contracttype]
#[derive(Clone)]
pub struct Member {
    pub address: Address,
    pub percent: u32,
}

#[contracttype]
pub enum DataKey {
    Admin,
    RequiredApprovals,
    MembersInitialized,
    Member(Address),
    MemberPercent(Address),
}

#[contract]
pub struct EnergyDistribution;

#[contractimpl]
impl EnergyDistribution {
    pub fn initialize(env: Env, admin: Address, required_approvals: u32) {
        admin.require_auth();
        
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::RequiredApprovals, &required_approvals);
        env.storage().instance().set(&DataKey::MembersInitialized, &false);
    }
    
    pub fn add_members_multisig(
        env: Env,
        approvers: Vec<Address>,
        members: Vec<Address>,
        percents: Vec<u32>,
    ) {
        // Verificar que hay suficientes aprobadores
        let required: u32 = env.storage().instance().get(&DataKey::RequiredApprovals).unwrap();
        assert!(approvers.len() >= required, "Not enough approvers");
        
        // Requerir autenticación de todos los aprobadores
        for approver in approvers.iter() {
            approver.require_auth();
        }
        
        // Verificar que members y percents tienen la misma longitud
        assert_eq!(members.len(), percents.len(), "Members and percents length mismatch");
        
        // Verificar que los porcentajes suman 100
        let total: u32 = percents.iter().sum();
        assert_eq!(total, 100, "Percents must sum to 100");
        
        // Guardar miembros y sus porcentajes
        for i in 0..members.len() {
            let member = members.get(i).unwrap();
            let percent = percents.get(i).unwrap();
            
            env.storage().instance().set(&DataKey::Member(member.clone()), &true);
            env.storage().instance().set(&DataKey::MemberPercent(member.clone()), &percent);
        }
        
        env.storage().instance().set(&DataKey::MembersInitialized, &true);
    }
    
    pub fn is_member(env: Env, address: Address) -> bool {
        env.storage()
            .instance()
            .get(&DataKey::Member(address))
            .unwrap_or(false)
    }
    
    pub fn get_member_percent(env: Env, address: Address) -> Option<u32> {
        env.storage()
            .instance()
            .get(&DataKey::MemberPercent(address))
    }
    
    pub fn get_admin(env: Env) -> Option<Address> {
        env.storage().instance().get(&DataKey::Admin)
    }
    
    pub fn get_required_approvals(env: Env) -> Option<u32> {
        env.storage().instance().get(&DataKey::RequiredApprovals)
    }
    
    pub fn are_members_initialized(env: Env) -> bool {
        env.storage()
            .instance()
            .get(&DataKey::MembersInitialized)
            .unwrap_or(false)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{
        testutils::Address as _,
        vec, Env,
    };

    #[test]
    fn test_initialize() {
        let env = Env::default();
        env.mock_all_auths();
        
        let contract_id = env.register(EnergyDistribution, ());
        let client = EnergyDistributionClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        
        let result = client.try_initialize(&admin, &3);
        assert!(result.is_ok());
        
        assert_eq!(client.get_admin(), Some(admin));
        assert_eq!(client.get_required_approvals(), Some(3));
        assert_eq!(client.are_members_initialized(), false);
    }
    
    #[test]
    fn test_add_members_multisig_success() {
        let env = Env::default();
        env.mock_all_auths();
        
        let contract_id = env.register(EnergyDistribution, ());
        let client = EnergyDistributionClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let investor1 = Address::generate(&env);
        let investor2 = Address::generate(&env);
        let investor3 = Address::generate(&env);
        let investor4 = Address::generate(&env);
        let investor5 = Address::generate(&env);
        
        client.try_initialize(&admin, &3).unwrap();
        
        let approvers = vec![&env, investor1.clone(), investor2.clone(), investor3.clone()];
        let members = vec![
            &env,
            investor1.clone(),
            investor2.clone(),
            investor3.clone(),
            investor4.clone(),
            investor5.clone(),
        ];
        let percents = vec![&env, 20, 30, 15, 25, 10];
        
        let result = client.try_add_members_multisig(&approvers, &members, &percents);
        assert!(result.is_ok());
        
        assert!(client.is_member(&investor1));
        assert!(client.is_member(&investor2));
        assert!(client.is_member(&investor3));
        assert!(client.is_member(&investor4));
        assert!(client.is_member(&investor5));
        
        assert_eq!(client.get_member_percent(&investor1), Some(20));
        assert_eq!(client.get_member_percent(&investor2), Some(30));
        assert_eq!(client.get_member_percent(&investor3), Some(15));
        assert_eq!(client.get_member_percent(&investor4), Some(25));
        assert_eq!(client.get_member_percent(&investor5), Some(10));
        
        assert!(client.are_members_initialized());
    }
}
