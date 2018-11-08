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
async function Recipte(i) {
    let recipte = await refund.methods.recipte(i).call();
    console.log(recipte)
}
async function getOwner() {
    let own = await refund.methods.owner().call();
    console.log(own);
}

async function sign_sendTransaction(privatekey,data, nonce, from, to, value) {
    let gas = 4700000
    let gasPrice = '0x2540be400'
    let txParams = {
        nonce: nonce,
        data: data,
        from: from,
        to: to,
        gas: gas,
        value: value,
        gasPrice: gasPrice,
    }
    let tx = new EthereumTx(txParams);
    tx.sign(privatekey)
    let serializedTx = tx.serialize();
    let serialize = '0x' + serializedTx.toString('Hex');
    try {
        let send = await web3.eth.sendSignedTransaction(serialize)
        console.log(send)
    } catch (err) {
        return err
    }
}
async function propose_deposit(){
    const privateKey = Buffer.from(env.testnet.privatekey, 'hex')
    let value = web3.utils.toHex(web3.utils.toWei('10', 'ether'));
    let nonce = await web3.eth.getTransactionCount(account_address, 'pending');
    nonce = web3.utils.toHex(nonce)
    sign_sendTransaction(privateKey,'pay',nonce,account_address,contract_address,value)
}
//退全部款
async function withdraw_all() {
    const privateKey = Buffer.from(env.testnet.privatekey, 'hex')
    const contractfunction = refund.methods.refundBalance();
    const abi = contractfunction.encodeABI();
    let nonce = await web3.eth.getTransactionCount(account_address, 'pending');//private key address
    nonce = web3.utils.toHex(nonce)
    sign_sendTransaction(privateKey,abi,nonce,account_address,contract_address,null)
}
    
//退1 ether*value
async function withdraw(value) {
    const privateKey = Buffer.from(env.testnet.privatekey, 'hex')
    const contractfunction = refund.methods.withdraw(value, account_address);
    const abi = contractfunction.encodeABI();
    let nonce = await web3.eth.getTransactionCount(account_address, 'pending');//private key address
    nonce = web3.utils.toHex(nonce)
    sign_sendTransaction(privateKey,abi,nonce,account_address,contract_address,null)

}

// getOwner()
// propose_deposit()
withdraw(5)
// withdraw_all()
// GetBalance()
// Recipte(2)