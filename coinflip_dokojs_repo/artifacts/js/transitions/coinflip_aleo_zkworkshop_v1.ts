import {
  tx
} from "@doko-js/core";
import * as records from "../types/coinflip_aleo_zkworkshop_v1";
import {
  CreditsTransfer_public_as_signerTransition,
  CreditsTransfer_private_to_publicTransition,
  CreditsTransfer_publicTransition,
  CreditsTransfer_public_to_privateTransition
} from "./credits";
import {
  Token_registryTransfer_publicTransition,
  Token_registryTransfer_public_to_privateTransition,
  Token_registryTransfer_public_as_signerTransition,
  Token_registryTransfer_private_to_publicTransition
} from "./token_registry";

export type Coinflip_aleo_zkworkshop_v1InitializeTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'initialize' > , ] >
  export type Coinflip_aleo_zkworkshop_v1Bet_public_nativeTransition = tx.ExecutionReceipt < [...CreditsTransfer_public_as_signerTransition['execution']['transitions'],
    tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'bet_public_native' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Bet_private_nativeTransition = tx.ExecutionReceipt < [...CreditsTransfer_private_to_publicTransition['execution']['transitions'],
    tx.Transition < [tx.ExternalRecordOutput, tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'bet_private_native' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Public_claim_nativeTransition = tx.ExecutionReceipt < [...CreditsTransfer_publicTransition['execution']['transitions'],
    tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'public_claim_native' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Public_claim_tokenTransition = tx.ExecutionReceipt < [...Token_registryTransfer_publicTransition['execution']['transitions'],
    tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'public_claim_token' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Private_claim_nativeTransition = tx.ExecutionReceipt < [...CreditsTransfer_public_to_privateTransition['execution']['transitions'],
    tx.Transition < [tx.ExternalRecordOutput, tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'private_claim_native' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Private_claim_tokenTransition = tx.ExecutionReceipt < [...Token_registryTransfer_public_to_privateTransition['execution']['transitions'],
    tx.Transition < [tx.ExternalRecordOutput, tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'private_claim_token' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Bet_public_tokenTransition = tx.ExecutionReceipt < [...Token_registryTransfer_public_as_signerTransition['execution']['transitions'],
    tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'bet_public_token' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Bet_private_tokenTransition = tx.ExecutionReceipt < [...Token_registryTransfer_private_to_publicTransition['execution']['transitions'],
    tx.Transition < [tx.ExternalRecordOutput, tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'bet_private_token' > ,
  ] >
  export type Coinflip_aleo_zkworkshop_v1Bet_ingameTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'bet_ingame' > , ] >
  export type Coinflip_aleo_zkworkshop_v1UnpauseTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'unpause' > , ] >
  export type Coinflip_aleo_zkworkshop_v1PauseTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'pause' > , ] >
  export type Coinflip_aleo_zkworkshop_v1Change_limitTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'change_limit' > , ] >
  export type Coinflip_aleo_zkworkshop_v1WithdrawTransition = tx.ExecutionReceipt < [...CreditsTransfer_publicTransition['execution']['transitions'],
    tx.Transition < [tx.FutureOutput], 'coinflip_aleo_zkworkshop_v1', 'withdraw' > ,
  ] >