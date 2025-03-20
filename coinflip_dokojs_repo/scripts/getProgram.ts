import { ExecutionMode } from "@doko-js/core";
import { Coinflip_aleo_zkworkshop_v1Contract } from "../artifacts/js/coinflip_aleo_zkworkshop_v1";
import { CreditsContract } from "../artifacts/js/credits";
import { Token_registryContract } from "../artifacts/js/token_registry";

export const coinflip_aleo_zkworkshop = new Coinflip_aleo_zkworkshop_v1Contract({ mode: ExecutionMode.SnarkExecute })
export const credits = new CreditsContract({ mode: ExecutionMode.SnarkExecute })
export const token_registry = new Token_registryContract({ mode: ExecutionMode.SnarkExecute })
const [aleoUser1, aleoUser2] = coinflip_aleo_zkworkshop.getAccounts()
export { aleoUser1, aleoUser2 }
export const token_id = BigInt("1234567890")
export const privateKey1 = process.env.ALEO_PRIVATE_KEY_TESTNET3