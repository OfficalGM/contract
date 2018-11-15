pragma solidity ^0.4.22;


contract Auth {
  address public Address;
    function verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns(address retAddr) {
        retAddr= ecrecover(hash, v, r, s);
        return retAddr;
    }
}
