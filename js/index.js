const Web3 = require('web3')
const Refund = require('../build/contracts/Refund.json');
const EthereumTx = require('ethereumjs-tx')

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let contract_address = '0xF3FbAdb5887A21a22215d7A86e8b41D0A6dC1eFD'
let refund = new web3.eth.Contract(Refund.abi, contract_address)
// console.log(refund)
async function GetBalance() {
    let balance = await refund.methods.getBalance().call();
    console.log(balance)
}
async function propose_deposit() {
    const privateKey = Buffer.from('af58e057cb1ccbcf31bed1dff0a56910e36a6e5b5c2e3e4cdcc742bbac662875', 'hex')
    let value = web3.utils.toHex(web3.utils.toWei('5', 'ether'));
    let nonce = await web3.eth.getTransactionCount('0x4E82321967Cb2aF509A7FFf42F771e5Cda08A49c', 'pending');//private key address
    nonce = web3.utils.toHex(nonce)
    let gas = 4700000
    let gasPrice = '0x2540be400'
    let txParams = {
        data: 'pay',
        from: '0x4E82321967Cb2aF509A7FFf42F771e5Cda08A49c',
        to: contract_address,
        value: value,
        nonce: nonce,
        gas: gas,
        gasPrice: gasPrice,
    }
    let tx = new EthereumTx(txParams);
    tx.sign(privateKey)
    let serializedTx = tx.serialize();
    let serialize = '0x' + serializedTx.toString('Hex');
    // let send=await web3.eth.sendRawTransaction(serialize);
    let send = await web3.eth.sendSignedTransaction(serialize)
    console.log(send)
}
//退全部款
async function withdraw_all() {
    let withdraw = await refund.methods.refundBalance().send({ 'from': '0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A' });
    console.log(withdraw.transactionHash)
}
//退1 ether*value
async function withdraw(value) {
    let withdraw = await refund.methods.withdraw(3,'0xE7Bda9693e931E42d0d3B7A51a7D0dccFa15A6fa').send({ 'from': '0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A' });
    console.log(withdraw.transactionHash)
}
async function Recipte(i){
    let recipte=await refund.methods.recipte(i).call();
    console.log(recipte)
}
// propose_deposit()
// withdraw(3)
// withdraw_all()
// GetBalance()
Recipte(0)