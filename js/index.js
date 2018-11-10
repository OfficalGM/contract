const Web3 = require('web3')
const Refund = require('../build/contracts/Refund.json');
const EthereumTx = require('ethereumjs-tx')
const env=require('../env');
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let contract_address = '0x9683eeb68fe0d3df151559670c83a40fbfd8472b'
let refund = new web3.eth.Contract(Refund.abi, contract_address)
const account_address='0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A'
async function GetBalance() {
    let balance = await refund.methods.getBalance().call();
    console.log(balance)
}
async function Propose_Deposit() {
    const privateKey = Buffer.from(env.development.privatekey, 'hex')
    let value = web3.utils.toHex(web3.utils.toWei('5', 'ether'));
    let nonce = await web3.eth.getTransactionCount(account_address, 'pending');//private key address
    nonce = web3.utils.toHex(nonce)
    let gas = 4700000
    let gasPrice = '0x2540be400'
    let txParams = {
        data: 'pay',
        from: account_address,
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
async function Withdraw_All() {
    let withdraw = await refund.methods.refundBalance().send({ 'from':account_address });
    console.log(withdraw.transactionHash)
}
//退1 ether*value
async function Withdraw(value) {
    let withdraw = await refund.methods.withdraw(3,'0xE7Bda9693e931E42d0d3B7A51a7D0dccFa15A6fa').send({ 'from': account_address });
    console.log(withdraw.transactionHash)
}
async function Recipte(i){
    let recipte=await refund.methods.recipte(i).call();
    console.log(recipte)
}
async function GetOwner(){
    let own=await refund.methods.owner().call();
    console.log(own);
}
async function GetTreeNumber(){
    let number=await refund.methods.tree().call();
    console.log(number);
}
// Propose_Deposit()
// Withdraw(3)
// Withdraw_all()
// GetBalance()
// Recipte(0)