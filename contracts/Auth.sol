pragma solidity ^0.4.22;

contract Auth {
    mapping(uint256=>Tree) public tree;
    event h(bytes32[] slice);
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
    // function SliceRootHash(uint idx,bytes32[] slice) public returns(bool){
    //     require(slice.length > 0, "slice.length = 0");
    //     uint index=idx;
    //     bytes32 rootHash = slice[0];
    //     for(uint i=slice.length;i>1;i--){
           
    //     }
    // }
    function AA(bytes32[] a) public {
        emit h(a);
    }
    function bytes32ToString(bytes32 x) public pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

}
