pragma solidity ^0.4.22;
import  './Ownable.sol';
contract Refund is Ownable{
    event LogReceivedFunds(address sender, uint amount);
    event LogReturnedFunds(address recipient, uint amount);

    function() public payable {
        emit LogReceivedFunds(msg.sender, msg.value);
    }
 
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    //退款
    function refundBalance() public onlyOwner {
        uint256 balance = address(this).balance;
        msg.sender.transfer(balance);
        emit LogReturnedFunds(msg.sender, balance);
    }
    function withdraw(uint amount,address addr) public onlyOwner{
        uint256 balance=amount*1 ether;
        addr.transfer(balance);
        emit LogReturnedFunds(msg.sender, balance);
    }
}
