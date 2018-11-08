# contract

## 複製設定檔
```
cp env.js.example env.js
```
## 部署智能合約
```
truffle deploy --reset --network <your-network>
```
## 測試智能合約
```
1.index.js --用於ganache
2.testnet.js --用於測試鍊上
```
```
1. node js/index.js --測試本地合約
2. node js/testnet.js --測試testnet上的智能合約
```
## 備註
要改index.js和testnet.js的contract address和account address