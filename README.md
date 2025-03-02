# CoinFlip Aleo Program

## Overview

The `coinflip_aleo_zkworkshop_v1.aleo` program is a smart contract deployed on the Aleo blockchain that enables users to participate in a coinflip betting game using native and token-based transactions. The contract supports both public and private betting mechanisms and enforces game rules through zero-knowledge proof computations.

## Deployment

This program is deployed on the Aleo blockchain, leveraging `credits.aleo` for native token transactions and `token_registry.aleo` for token-based operations.

## Functions

### 1. `initialize(owner: address, amount: u64) -> Future`

Initializes the contract with an admin address and sets the betting limit.

### 2. `bet_public_native(amount: [u64; 5], coins: [bool; 5]) -> Future`

Allows a user to place a public bet using Aleo native credits. The contract generates random coinflip outcomes and updates user balances accordingly.

### 3. `bet_private_native(input_record: credits.aleo/credits, amount: [u64; 5], coins: [bool; 5]) -> (credits.aleo/credits, Future)`

Enables a user to place a private bet using Aleo native credits while maintaining privacy.

### 4. `bet_public_token(amount: [u64; 5], coins: [bool; 5], token_id: field) -> Future`

Allows a user to place a public bet using a specific token from `token_registry.aleo`.

### 5. `bet_private_token(input_record: token_registry.aleo/Token, amount: [u64; 5], coins: [bool; 5], token_id: field) -> (token_registry.aleo/Token, Future)`

Allows a user to place a private bet using a specific token, ensuring confidentiality.

### 6. `bet_ingame(amount: [u64; 5], coins: [bool; 5]) -> Future`

Enables in-game betting using the contract's stored balance.

### 7. `public_claim_native(amount: u64) -> Future`

Allows users to claim their winnings in Aleo native credits.

### 8. `public_claim_token(amount: u64, token_id: field) -> Future`

Enables users to claim their winnings in a specific token.

### 9. `private_claim_native(input_record: credits.aleo/credits, amount: u64) -> (credits.aleo/credits, Future)`

Allows users to privately claim their winnings in Aleo native credits.

### 10. `private_claim_token(input_record: token_registry.aleo/Token, amount: u64, token_id: field) -> (token_registry.aleo/Token, Future)`

Allows users to privately claim their winnings in a specific token.

### 11. `unpause() -> Future`

Unpauses the contract, allowing bets to be placed.

### 12. `pause() -> Future`

Pauses the contract, preventing bets from being placed.

### 13. `change_limit(amount: u64) -> Future`

Allows the admin to modify the betting limit.

### 14. `withdraw(amount: u64) -> Future`

Allows the admin to withdraw funds from the contract.

## License

This project is open-source and follows the Aleo smart contract development guidelines.
