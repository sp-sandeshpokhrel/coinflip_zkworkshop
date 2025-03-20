import { aleoUser1, coinflip_aleo_zkworkshop, credits } from "./getProgram"

const maxAmountToBet = BigInt(1000000000)
const fundAmount = BigInt(10000000)
async function deploy() {
    const deployTx = await coinflip_aleo_zkworkshop.deploy()
    await deployTx.wait()
}

async function initialize() {
    const initializeTx = await coinflip_aleo_zkworkshop.initialize(aleoUser1, maxAmountToBet)
    await initializeTx.wait()
}

async function unpause() {
    const unpauseTx = await coinflip_aleo_zkworkshop.unpause()
    await unpauseTx.wait()
}

async function fundProgram() {
    const fundTx = await credits.transfer_public(coinflip_aleo_zkworkshop.address(), fundAmount)
    await fundTx.wait()
}

async function main() {
    // await deploy()
    // await initialize()
    await unpause()
    await fundProgram()
    console.log("Deployed and initialized contract")
}

main()