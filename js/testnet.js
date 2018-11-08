// contract address 0xd44af5c682157f493ba2ebede6e0506428debf67
// private key address 0xc222fDe7CaE05d8514DF13C901e4BEa3F23523cf
const Web3 = require('web3')
const Refund = require('../build/contracts/Refund.json');
const EthereumTx = require('ethereumjs-tx')
const env = require('../env');
let web3 = new Web3(new Web3.providers.HttpProvider(env.testnet.web3Url));
let contract_address = '0xd44af5c682157f493ba2ebede6e0506428debf67'
const account_address = '0xc222fDe7CaE05d8514DF13C901e4BEa3F23523cf'
let refund = new web3.eth.Contract(Refund.abi, contract_address)
// console.log(refund)


async function GetBalance() {
    let balance = await refund.methods.getBalance().call();
    console.log(balance)
}

async function propose_deposit() {
    const privateKey = Buffer.from(env.testnet.privatekey, 'hex')
    let value = web3.utils.toHex(web3.utils.toWei('10', 'ether'));
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
    try {
        let send = await web3.eth.sendSignedTransaction(serialize)
        console.log(send)
    } catch (err) {
        console.log(err)
    }
}
//退全部款
async function withdraw_all() {
    const contractfunction = refund.methods.refundBalance();
    const abi = contractfunction.encodeABI();
    const privateKey = Buffer.from(env.testnet.privatekey, 'hex')
    let nonce = await web3.eth.getTransactionCount(account_address, 'pending');//private key address
    nonce = web3.utils.toHex(nonce)

    let gas = 4700000
    let gasPrice = '0x2540be400'
    let txParams = {
        nonce: nonce,
        data: abi,
        from: account_address,
        to:contract_address,
        gas: gas,
        gasPrice: gasPrice,
    }
    let tx = new EthereumTx(txParams);
    tx.sign(privateKey)
    let serializedTx = tx.serialize();
    let serialize = '0x' + serializedTx.toString('Hex');
    try {
        let withdraw = await web3.eth.sendSignedTransaction(serialize)
        console.log(withdraw)
    } catch (err) {
        console.log(err)
    }

}
//退1 ether*value
async function withdraw(value) {
    const contractfunction = refund.methods.withdraw(value,account_address);
    const abi = contractfunction.encodeABI();
    const privateKey = Buffer.from(env.testnet.privatekey, 'hex')
    let nonce = await web3.eth.getTransactionCount(account_address, 'pending');//private key address
    nonce = web3.utils.toHex(nonce)

    let gas = 4700000
    let gasPrice = '0x2540be400'
    let txParams = {
        nonce: nonce,
        data: abi,
        from: account_address,
        to:contract_address,
        gas: gas,
        gasPrice: gasPrice,
    }
    let tx = new EthereumTx(txParams);
    tx.sign(privateKey)
    let serializedTx = tx.serialize();
    let serialize = '0x' + serializedTx.toString('Hex');
    try {
        let withdraw = await web3.eth.sendSignedTransaction(serialize)
        console.log(withdraw)
    } catch (err) {
        console.log(err)
    }
   
}
async function Recipte(i) {
    let recipte = await refund.methods.recipte(i).call();
    console.log(recipte)
}
async function getOwner() {
    let own = await refund.methods.owner().call();
    console.log(own);
}
async function balance() {
    let b = await web3.eth.getBalance('0xc222fDe7CaE05d8514DF13C901e4BEa3F23523cf')
    console.log(b)
}
// balance()
// getOwner()
// propose_deposit()
// withdraw(3)
withdraw_all()
// GetBalance()
// Recipte(2)