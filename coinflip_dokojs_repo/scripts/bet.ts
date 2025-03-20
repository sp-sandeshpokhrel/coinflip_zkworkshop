import { Hasher } from "@doko-js/wasm";
import { TokenOwner } from "../artifacts/js/types/token_registry";
import { aleoUser1, coinflip_aleo_zkworkshop, privateKey1, token_id, token_registry } from "./getProgram"
import { getTokenOwnerLeo } from "../artifacts/js/js2leo/token_registry";
import { js2leo, leo2js } from "@doko-js/core";
import { decryptToken } from "../artifacts/js/leo2js/token_registry";

const amountToBet = BigInt(1000000)

async function bet_native() {
    const betTx = await coinflip_aleo_zkworkshop.bet_public_native([amountToBet, amountToBet, amountToBet, amountToBet, amountToBet], [true, false, true, true, true])
    await betTx.wait()
}

async function claim_native() {
    const balance: TokenOwner = {
        account: aleoUser1,
        token_id: BigInt("11111111111111111111") // native token token id
    };
    console.log("struct", balance);
    const balance_hash = leo2js.field(Hasher.hash("bhp256", js2leo.json(getTokenOwnerLeo(balance)), "field", "testnet"));
    console.log("hash", balance_hash);

    console.log("user bet publicly. and result is: ", await coinflip_aleo_zkworkshop.user_streak(balance_hash));

    const have_money = await coinflip_aleo_zkworkshop.user_balance(balance_hash);

    console.log("have_money", have_money);

    if (have_money > BigInt(0)) {
        const tx = await coinflip_aleo_zkworkshop.public_claim_native(have_money, BigInt("11111111111111111111"));
        await tx.wait();
    }
}

async function register_token() {
    const registerTokenTx = await token_registry.register_token(token_id, BigInt(123456), BigInt(12345), 6, BigInt("99999999999999"), false, aleoUser1)
    await registerTokenTx.wait()
}

async function bet_public_token() {
    const mintTx = await token_registry.mint_public(token_id, aleoUser1, BigInt(100000000), 4294967295)
    await mintTx.wait()
    const betTx = await coinflip_aleo_zkworkshop.bet_public_token([amountToBet, amountToBet, amountToBet, amountToBet, amountToBet], [true, false, true, true, true], token_id)
    await betTx.wait()

}

async function claim_public_token() {
    const balance: TokenOwner = {
        account: aleoUser1,
        token_id: token_id
    };
    const balance_hash = leo2js.field(Hasher.hash("bhp256", js2leo.json(getTokenOwnerLeo(balance)), "field", "testnet"));
    const have_money = await coinflip_aleo_zkworkshop.user_balance(balance_hash);
    if (have_money > BigInt(0)) {
        const tx = await coinflip_aleo_zkworkshop.public_claim_token(have_money, token_id);
        await tx.wait();
    }
}

async function bet_private_token() {
    const mintPrivateTx = await token_registry.mint_private(token_id, aleoUser1, BigInt(100000000), false, 4294967295)
    const [mintedRecord] = await mintPrivateTx.wait()
    const decryptedRecord = decryptToken(mintedRecord, privateKey1)
    const betTx = await coinflip_aleo_zkworkshop.bet_private_token(decryptedRecord, [amountToBet, amountToBet, amountToBet, amountToBet, amountToBet], [true, false, true, true, true], token_id)
    const [returnRecord] = await betTx.wait()
    console.log("returnRecord", returnRecord)
}

async function claim_private_token() {
    const balance: TokenOwner = {
        account: aleoUser1,
        token_id: token_id
    };
    const balance_hash = leo2js.field(Hasher.hash("bhp256", js2leo.json(getTokenOwnerLeo(balance)), "field", "testnet"));
    const have_money = await coinflip_aleo_zkworkshop.user_balance(balance_hash);
    if (have_money > BigInt(0)) {
        const tx = await coinflip_aleo_zkworkshop.private_claim_token(have_money, token_id);
        await tx.wait();
    }
}

async function main() {
    // await bet_native()
    // await claim_native()
    await register_token()
    await bet_private_token()
    await claim_private_token()
    console.log("Bet and claimed")
}

main()