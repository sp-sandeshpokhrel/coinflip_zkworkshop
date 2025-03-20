

# Coinflip DokoJS Repo

This repository contains scripts built with [DokoJS]((https://github.com/venture23-aleo/doko-js)) for interacting with the Coinflip program on the Aleo blockchain.

## Scripts

### Deploy the Coinflip Contract

Deploy the Coinflip smart contract using the following command:

```sh
npx tsx scripts/deploy.ts
```

This script will handle deploying the contract to the Aleo blockchain.

### Place a Bet

To place a bet using the Coinflip program, use the `bet.ts` script:

```sh
npx tsx scripts/bet.ts
```

Modify the script to specify parameters such as the amount and choice of bet before executing.

## Customizing and Running Other Functions

Each script under the `scripts/` directory is designed to execute a specific function from the Coinflip program. You can check the functions available in each script and modify them as needed before running.

Run any script using:

```sh
npx tsx scripts/<script_name>.ts
```

Replace `<script_name>` with the desired script file (e.g., `deploy.ts`, `bet.ts`).
