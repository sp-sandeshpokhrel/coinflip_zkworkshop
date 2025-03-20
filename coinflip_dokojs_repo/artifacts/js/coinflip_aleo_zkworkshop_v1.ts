import {
  credits as credits_credits
} from "./types/credits";
import {
  getcreditsLeo as credits_getcreditsLeo
} from "./js2leo/credits";
import {
  Token as token_registry_Token
} from "./types/token_registry";
import {
  getTokenLeo as token_registry_getTokenLeo
} from "./js2leo/token_registry";
import {
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js,
  ExternalRecord,
  ExecutionMode,
  ExecutionContext,
  CreateExecutionContext,
  TransactionResponse
} from "@doko-js/core";
import {
  BaseContract
} from "../../contract/base-contract";
import {
  TransactionModel
} from "@provablehq/sdk";
import * as receipt from "./transitions/coinflip_aleo_zkworkshop_v1";

export class Coinflip_aleo_zkworkshop_v1Contract extends BaseContract {

  constructor(config: Partial < ContractConfig > = {
    mode: ExecutionMode.LeoRun
  }) {
    super({
      ...config,
      appName: 'coinflip_aleo_zkworkshop_v1',
      fee: '0.01',
      contractPath: 'artifacts/leo/coinflip_aleo_zkworkshop_v1',
      isImportedAleo: false
    });
  }
  async initialize(r0: LeoAddress, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1InitializeTransition, [] >> {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('initialize', params);
    return result
  }

  async bet_public_native(r0: Array < bigint > , r1: Array < boolean > ): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Bet_public_nativeTransition, [] >> {
    const r0Leo = js2leo.arr2string(js2leo.array(r0, js2leo.u64));
    const r1Leo = js2leo.arr2string(js2leo.array(r1, js2leo.boolean));

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('bet_public_native', params);
    return result
  }

  async bet_private_native(r0: credits_credits, r1: Array < bigint > , r2: Array < boolean > ): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Bet_private_nativeTransition, [ExternalRecord < 'credits', 'credits' > ] >> {
    const r0Leo = js2leo.json(credits_getcreditsLeo(r0));
    const r1Leo = js2leo.arr2string(js2leo.array(r1, js2leo.u64));
    const r2Leo = js2leo.arr2string(js2leo.array(r2, js2leo.boolean));

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('bet_private_native', params);
    result.set_converter_fn([
      [leo2js.externalRecord, 'credits.aleo/credits']
    ]);
    return result
  }

  async public_claim_native(r0: bigint, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Public_claim_nativeTransition, [] >> {
    const r0Leo = js2leo.u64(r0);
    const r1Leo = js2leo.field(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('public_claim_native', params);
    return result
  }

  async public_claim_token(r0: bigint, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Public_claim_tokenTransition, [] >> {
    const r0Leo = js2leo.u64(r0);
    const r1Leo = js2leo.field(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('public_claim_token', params);
    return result
  }

  async private_claim_native(r0: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Private_claim_nativeTransition, [ExternalRecord < 'credits', 'credits' > ] >> {
    const r0Leo = js2leo.u64(r0);

    const params = [r0Leo]
    const result = await this.ctx.execute('private_claim_native', params);
    result.set_converter_fn([
      [leo2js.externalRecord, 'credits.aleo/credits']
    ]);
    return result
  }

  async private_claim_token(r0: bigint, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Private_claim_tokenTransition, [ExternalRecord < 'token_registry', 'Token' > ] >> {
    const r0Leo = js2leo.u64(r0);
    const r1Leo = js2leo.field(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('private_claim_token', params);
    result.set_converter_fn([
      [leo2js.externalRecord, 'token_registry.aleo/Token']
    ]);
    return result
  }

  async bet_public_token(r0: Array < bigint > , r1: Array < boolean > , r2: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Bet_public_tokenTransition, [] >> {
    const r0Leo = js2leo.arr2string(js2leo.array(r0, js2leo.u64));
    const r1Leo = js2leo.arr2string(js2leo.array(r1, js2leo.boolean));
    const r2Leo = js2leo.field(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('bet_public_token', params);
    return result
  }

  async bet_private_token(r0: token_registry_Token, r1: Array < bigint > , r2: Array < boolean > , r3: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Bet_private_tokenTransition, [ExternalRecord < 'token_registry', 'Token' > ] >> {
    const r0Leo = js2leo.json(token_registry_getTokenLeo(r0));
    const r1Leo = js2leo.arr2string(js2leo.array(r1, js2leo.u64));
    const r2Leo = js2leo.arr2string(js2leo.array(r2, js2leo.boolean));
    const r3Leo = js2leo.field(r3);

    const params = [r0Leo, r1Leo, r2Leo, r3Leo]
    const result = await this.ctx.execute('bet_private_token', params);
    result.set_converter_fn([
      [leo2js.externalRecord, 'token_registry.aleo/Token']
    ]);
    return result
  }

  async bet_ingame(r0: Array < bigint > , r1: Array < boolean > ): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Bet_ingameTransition, [] >> {
    const r0Leo = js2leo.arr2string(js2leo.array(r0, js2leo.u64));
    const r1Leo = js2leo.arr2string(js2leo.array(r1, js2leo.boolean));

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('bet_ingame', params);
    return result
  }

  async unpause(): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1UnpauseTransition, [] >> {

    const params = []
    const result = await this.ctx.execute('unpause', params);
    return result
  }

  async pause(): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1PauseTransition, [] >> {

    const params = []
    const result = await this.ctx.execute('pause', params);
    return result
  }

  async change_limit(r0: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1Change_limitTransition, [] >> {
    const r0Leo = js2leo.u64(r0);

    const params = [r0Leo]
    const result = await this.ctx.execute('change_limit', params);
    return result
  }

  async withdraw(r0: bigint): Promise < TransactionResponse < TransactionModel & receipt.Coinflip_aleo_zkworkshop_v1WithdrawTransition, [] >> {
    const r0Leo = js2leo.u64(r0);

    const params = [r0Leo]
    const result = await this.ctx.execute('withdraw', params);
    return result
  }

  async amount_limit(key: boolean, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.boolean(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'amount_limit',
      params[0],
    );

    if (result != null)
      return leo2js.u64(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`amount_limit returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async admin(key: boolean, defaultValue ? : LeoAddress): Promise < LeoAddress > {
    const keyLeo = js2leo.boolean(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'admin',
      params[0],
    );

    if (result != null)
      return leo2js.address(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`admin returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async status(key: boolean, defaultValue ? : number): Promise < number > {
    const keyLeo = js2leo.boolean(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'status',
      params[0],
    );

    if (result != null)
      return leo2js.u8(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`status returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async user_balance(key: bigint, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'user_balance',
      params[0],
    );

    if (result != null)
      return leo2js.u64(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`user_balance returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async user_streak(key: bigint, defaultValue ? : Array < boolean > ): Promise < Array < boolean >> {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'user_streak',
      params[0],
    );

    if (result != null)
      return leo2js.array(result, leo2js.boolean);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`user_streak returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}