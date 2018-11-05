const Web3 = require('web3')
const Refund = require('../build/contracts/Refund.json');
const EthereumTx = require('ethereumjs-tx')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let contract_address = '0x9683Eeb68FE0d3dF151559670C83A40fBfD8472B'
let refund = new web3.eth.Contract(Refund.abi, contract_address)
// console.log(refund);
async function GetBalance() {
    let balance = await refund.methods.getBalance().call();
    console.log(balance)
}
// console.log(refund)
async function propose_deposit() {
    const privateKey = Buffer.from('43cbbbf7643cd3f8bdf54d70014cd5fcc313b243aadec7081d16c1ad04ee4b8f', 'hex')
    let value = web3.utils.toHex(web3.utils.toWei('5', 'ether'));
    let nonce = await web3.eth.getTransactionCount('0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A', 'pending');//private key address
    nonce = web3.utils.toHex(nonce)
    let gas = 4700000
    let gasPrice = '0x2540be400'
    let txParams = {
        data:'pay',
        from:'0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A',
        to: contract_address,
        value: value,
        nonce: nonce,
        gas:gas,
        gasPrice: gasPrice,
    }
    let tx=new EthereumTx(txParams);
    tx.sign(privateKey)
    let serializedTx = tx.serialize();
    let serialize='0x'+serializedTx.toString('Hex');
    // let send=await web3.eth.sendRawTransaction(serialize);
    let send=await web3.eth.sendSignedTransaction(serialize)
    console.log(send.transactionHash)
}
//退全部款
async function withdraw(){
    let withdraw=await refund.methods.refundBalance().send({'from':'0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A'});
    console.log(withdraw.transactionHash)
}
//退1 ether
async function refundB(){
    let withdraw=await refund.methods.refundB().send({'from':'0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A'});
    console.log(withdraw.transactionHash)
}
// propose_deposit()
// refundB()
// withdraw()
// GetBalance()
