pragma solidity ^0.4.22;


contract Auth {
    mapping(uint256=>Tree) public tree;
    uint256 public TreeNumber;
    struct Tree{
        bytes32 RootHash;
    }
    function verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns(address retAddr) {
        retAddr= ecrecover(hash, v, r, s);
        return retAddr;
    }
    function setTree(bytes32 _roothash) public returns(bool) {
        tree[TreeNumber++]=Tree(_roothash);
        return true;
    }
    function SliceRootHash(bytes32[] slice) public returns(bool){
        require(slice.length > 0, "slice.length = 0");
        return true;
    }
}
