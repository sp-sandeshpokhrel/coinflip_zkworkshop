import credits.aleo;
import token_registry.aleo;

program coinflip_aleo_zkworkshop_v1.aleo{

    struct TokenOwner {
        account: address,
        token_id: field
    }

    mapping amount_limit: bool => u64;
    mapping admin: bool => address;
    mapping status: bool => u8;
    mapping user_balance: field => u64;
    mapping user_streak: field => [bool;5];

    const UNPAUSED_STATUS: u8 = 1u8;
    const PAUSED_STATUS: u8 = 0u8;
    const HEAD: bool = true;   
    const TAIL: bool = false;
    const NATIVE_TOKEN: field = 11111111111111111111field;

    async transition initialize(owner: address, amount: u64) -> Future {
        assert(amount > 0u64);
        return (finalize_initialize(owner, amount));
    }

    async function finalize_initialize(owner: address, amount:u64){
        assert(admin.contains(true).not());
        admin.set(true, owner);
        amount_limit.set(true, amount);
        status.set(true, PAUSED_STATUS);
    }

    async transition bet_public_native(amount: [u64; 5], coins: [bool; 5]) -> Future {
        let total_amount: u64 = 0u64;
        for i: u32 in 0u32..5u32 {
            total_amount += amount[i];
        }
        let transfer_output: Future = credits.aleo/transfer_public_as_signer(self.address, total_amount);

        return (finalize_bet_public_native(self.caller, total_amount, amount, coins, NATIVE_TOKEN, transfer_output));   
    }

    async function finalize_bet_public_native(user: address, total_amount: u64, amount: [u64; 5],  coins: [bool; 5], token_id: field, f:Future) {
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(total_amount <= amount_limit.get(true));
        let contract_balance: u64 = credits.aleo/account.get(self.address);
        assert(contract_balance >= total_amount*2u64);

        let token_owner: TokenOwner = TokenOwner {
            account: user,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        let winning_bool: [bool; 5] = [ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool()];
        let winning: (u64,[bool; 5]) = get_value(winning_bool, amount, coins);
        let latest_amount: u64 = user_balance.get_or_use(balance_key, 0u64);
        user_balance.set(balance_key, latest_amount + winning.0);
        user_streak.set(balance_key, winning.1);
    }

    
    inline get_value(winning_bool: [bool; 5], amount: [u64; 5],  coins: [bool; 5]) -> (u64, [bool; 5]) {
        let winning_amount: u64 = 0u64;
        let win1: bool = false;
        let win2: bool = false;
        let win3: bool = false;
        let win4: bool = false;
        let win5: bool = false;
        for i: u8 in 0u8..5u8{
            if amount[i] > 0u64 {
                if winning_bool[i] == coins[i] {
                    winning_amount += amount[i] * 2u64;
                    if i == 0u8 { win1 = true; }
                    else if i == 1u8 { win2 = true; }
                    else if i == 2u8 { win3 = true; }
                    else if i == 3u8 { win4 = true; }
                    else if i == 4u8 { win5 = true; }

                }
            }
        }
        let winning_streak: [bool; 5] = [win1, win2, win3, win4, win5];
        return (winning_amount, winning_streak);
    }

    async transition bet_private_native(input_record: credits.aleo/credits, amount: [u64; 5],  coins: [bool; 5]) -> (credits.aleo/credits, Future) {
        let total_amount: u64 = 0u64;
        for i: u32 in 0u32..5u32 {
            total_amount += amount[i];
        }
        let transfer_output: (credits.aleo/credits, Future) = credits.aleo/transfer_private_to_public(input_record, self.address, total_amount);
        
        let token_owner: TokenOwner = TokenOwner {
            account: self.caller,
            token_id: NATIVE_TOKEN
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        return (transfer_output.0, finalize_bet_private_native(balance_key, total_amount, amount, coins, transfer_output.1));   
    }

    async function finalize_bet_private_native(user: field, total_amount: u64, amount: [u64; 5],  coins: [bool; 5], f:Future) {
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(total_amount <= amount_limit.get(true));
        let contract_balance: u64 = credits.aleo/account.get(self.address);
        assert(contract_balance >= total_amount*2u64);

        let winning_bool: [bool; 5] = [ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool()];
        let winning: (u64,[bool; 5]) = get_value(winning_bool, amount, coins);
        let latest_amount: u64 = user_balance.get_or_use(user, 0u64);
        user_balance.set(user, latest_amount + winning.0);
        user_streak.set(user, winning.1);
    }
    
    async transition public_claim_native(amount: u64, token_id: field) -> Future {
        assert(amount > 0u64);
        let transfer_output: Future = credits.aleo/transfer_public(self.caller, amount);
        return (finalize_public_claim_native(transfer_output, self.caller, amount, token_id));
    }

    async function finalize_public_claim_native(f: Future, send_to: address, amount: u64, token_id: field) 
    {  
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        let token_owner: TokenOwner = TokenOwner {
            account: send_to,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        assert(user_balance.get(balance_key) >= amount);
        let userAmount: u64 = user_balance.get_or_use(balance_key, 0u64);
        user_balance.set(balance_key, userAmount-amount);
    }

    async transition public_claim_token(amount: u64, token_id: field) -> Future {
        assert(amount > 0u64);
        let transfer_output: Future = token_registry.aleo/transfer_public(token_id, self.caller, amount as u128);
        return (finalize_public_claim_token(transfer_output, self.caller, amount, token_id));
    }

    async function finalize_public_claim_token(f: Future, send_to: address, amount: u64, token_id: field) 
    {  
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        let token_owner: TokenOwner = TokenOwner {
            account: send_to,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        assert(user_balance.get(balance_key) >= amount);
        let userAmount: u64 = user_balance.get_or_use(balance_key, 0u64);
        user_balance.set(balance_key, userAmount-amount);
    }

    async transition private_claim_native(amount: u64) -> (credits.aleo/credits, Future) {
        assert(amount > 0u64);
        let transfer_output: (credits.aleo/credits, Future) = credits.aleo/transfer_public_to_private(self.caller, amount);
        let token_owner: TokenOwner = TokenOwner {
            account: self.caller,
            token_id: NATIVE_TOKEN
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        return (transfer_output.0, finalize_private_claim_native(transfer_output.1, balance_key, amount));
    }

    async function finalize_private_claim_native(f: Future, send_to: field, amount: u64) 
    {  
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(user_balance.get(send_to) >= amount);
        let userAmount: u64 = user_balance.get_or_use(send_to, 0u64);
        user_balance.set(send_to, userAmount-amount);
    }


    async transition private_claim_token(amount: u64, token_id: field) -> (token_registry.aleo/Token, Future) {
        assert(amount > 0u64);
        let transfer_output: (token_registry.aleo/Token, Future) = token_registry.aleo/transfer_public_to_private(token_id, self.caller, amount as u128, false);
        let token_owner: TokenOwner = TokenOwner {
            account: self.caller,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        return (transfer_output.0, finalize_private_claim_token(transfer_output.1, balance_key, amount));
    }

    async function finalize_private_claim_token(f: Future, send_to: field, amount: u64) 
    {  
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(user_balance.get(send_to) >= amount);
        let userAmount: u64 = user_balance.get_or_use(send_to, 0u64);
        user_balance.set(send_to, userAmount-amount);
    }

    async transition bet_public_token(amount: [u64; 5], coins: [bool; 5], token_id: field) -> Future {
        let total_amount: u64 = 0u64;
        for i: u32 in 0u32..5u32 {
            total_amount += amount[i];
        }
        let transfer_output: Future = token_registry.aleo/transfer_public_as_signer(token_id, self.address, total_amount as u128);

        return (finalize_bet_public_token(self.caller, total_amount, amount, coins, token_id, transfer_output));   
    }

    async function finalize_bet_public_token(user: address, total_amount: u64, amount: [u64; 5],  coins: [bool; 5], token_id: field, f:Future) {
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(total_amount <= amount_limit.get(true));
        let contract: TokenOwner = TokenOwner {
            account: self.address,
            token_id: token_id
        };
        let contract_balance_key: field = BHP256::hash_to_field(contract);
        let contract_balance: u128 = token_registry.aleo/authorized_balances.get(contract_balance_key).balance;
        assert(contract_balance >= total_amount as u128*2u128);

        let token_owner: TokenOwner = TokenOwner {
            account: user,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        let winning_bool: [bool; 5] = [ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool()];
        let winning: (u64,[bool; 5]) = get_value(winning_bool, amount, coins);
        let latest_amount: u64 = user_balance.get_or_use(balance_key, 0u64);
        user_balance.set(balance_key, latest_amount + winning.0);
        user_streak.set(balance_key, winning.1);
    }


    async transition bet_private_token(input_record: token_registry.aleo/Token, amount: [u64; 5],  coins: [bool; 5], token_id: field) -> ( token_registry.aleo/Token, Future) {
        let total_amount: u64 = 0u64;
        for i: u32 in 0u32..5u32 {
            total_amount += amount[i];
        }
        let transfer_output: (token_registry.aleo/Token, Future) = token_registry.aleo/transfer_private_to_public(self.address, total_amount as u128,input_record);
        
        let token_owner: TokenOwner = TokenOwner {
            account: self.caller,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        return (transfer_output.0, finalize_bet_private_token(balance_key, total_amount, amount, coins, transfer_output.1));   
    }

    async function finalize_bet_private_token(user: field, total_amount: u64, amount: [u64; 5],  coins: [bool; 5], f:Future) {
        f.await();
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(total_amount <= amount_limit.get(true));
        let contract_balance: u64 = credits.aleo/account.get(self.address);
        assert(contract_balance >= total_amount*2u64);

        let winning_bool: [bool; 5] = [ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool()];
        let winning: (u64,[bool; 5]) = get_value(winning_bool, amount, coins);
        let latest_amount: u64 = user_balance.get_or_use(user, 0u64);
        user_balance.set(user, latest_amount + winning.0);
        user_streak.set(user, winning.1);
    }

    async transition bet_ingame(amount: [u64; 5], coins: [bool; 5]) -> Future {
        let total_amount: u64 = 0u64;
        for i: u32 in 0u32..5u32 {
            total_amount += amount[i];
        }
        return (finalize_bet_ingame(self.caller, total_amount, amount, coins, NATIVE_TOKEN));   
    }

    async function finalize_bet_ingame(user: address, total_amount: u64, amount: [u64; 5],  coins: [bool; 5], token_id: field) {
        assert_eq(status.get(true), UNPAUSED_STATUS);
        assert(total_amount <= amount_limit.get(true));
        let contract_balance: u64 = credits.aleo/account.get(self.address);
        assert(contract_balance >= total_amount*2u64);

        let token_owner: TokenOwner = TokenOwner {
            account: user,
            token_id: token_id
        };
        let balance_key: field = BHP256::hash_to_field(token_owner);
        let winning_bool: [bool; 5] = [ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool(), ChaCha::rand_bool()];
        let winning: (u64,[bool; 5]) = get_value(winning_bool, amount, coins);
        let latest_amount: u64 = user_balance.get_or_use(balance_key, 0u64);
        user_balance.set(balance_key, latest_amount + winning.0);
        user_streak.set(balance_key, winning.1);
    }

    async transition unpause() -> Future {
        return( finalize_unpause(self.caller));
    }

    async function finalize_unpause(from: address) {
        let owner: address = admin.get(true);
        assert_eq(from, owner);
        status.set(true, UNPAUSED_STATUS);
    }

    async transition pause() -> Future {
        return( finalize_pause(self.caller));
    }

    async function finalize_pause(from: address) {
        let owner: address = admin.get(true);
        assert_eq(from, owner);
        status.set(true, PAUSED_STATUS);
    }

    async transition change_limit(amount: u64) -> Future {
        return( finalize_change_limit(self.caller, amount));
    }

    async function finalize_change_limit(from: address, amount:u64) {
        let owner: address = admin.get(true);
        assert_eq(from, owner);
        amount_limit.set(true, amount);
    }

    async transition withdraw(amount: u64) -> Future{
        let transfer_output: Future = credits.aleo/transfer_public(self.caller, amount);
        return (finalize_withdraw(amount, self.caller, transfer_output));
    }

    async function finalize_withdraw(amount: u64, from: address, f: Future) {
        f.await();
        let owner: address = admin.get(true);
        assert_eq(from, owner);
    }

}