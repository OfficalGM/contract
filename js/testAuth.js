const Web3 = require('web3')
const Auth = require('../build/contracts/Auth.json');
const EthereumTx = require('ethereumjs-tx')
const env = require('../env');
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let contract_address = '0x1478a2B11a36b67284422038aBFeDf5B6Ba96c6c'
let auth = new web3.eth.Contract(Auth.abi, contract_address)
// console.log(auth);
const account_address = '0xA2Be5Cc6a7683EA3E3b0405E3169111db7DaC31A'


async function AA() {
    let msg = web3.utils.sha3("Schoolbus");
    let signature = await web3.eth.sign(msg, account_address)
    
    // console.log(signature)
    let r = signature.slice(0, 66)
    let s = '0x' + signature.slice(66, 130)
    let v = '0x' + signature.slice(130, 132)
    v = web3.utils.toDecimal(v)+27
    
    console.log(msg)

    console.log(r);
    console.log(s);
    console.log(v);

    let verify=await auth.methods.verify(msg,v,r,s).call();
    console.log(verify)
}
AA()
