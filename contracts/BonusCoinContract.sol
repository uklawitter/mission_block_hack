pragma solidity ^0.4.19;

contract BonusCoinContract {

    address public owner;

    string public coinName;

    uint256 private currentTotal;

    mapping(address => uint256) balance;
    mapping(bytes32 => uint256) allowance;

    modifier onlyOwner(address addr) {
        require(addr == owner);
        _;
    }

    function BonusCoinContract(string newName, address newOwner) public {
        owner = newOwner;
        coinName = newName;
        currentTotal = 0;
    }

    function getBalance() public view
        returns(uint256) {

        return balance[msg.sender];
    }

    function allowWithdrawal(uint256 amount, bytes32 hashedSecret) public onlyOwner(msg.sender) {
        allowance[hashedSecret] += amount;
    }

    function withdraw(string secret) public {
        bytes32 hash = keccak256(secret);
        uint256 additionalBalance = allowance[hash];
        if (additionalBalance == 0) {
	  WithdrawalFailed(msg.sender, coinName, secret);
	  return;
	}
	
        allowance[hash] = 0;
        uint256 senderOldBalance = balance[msg.sender];
        uint256 newBalance = balance[msg.sender] += additionalBalance;
        currentTotal += additionalBalance;
        BalanceChanged(msg.sender, coinName, senderOldBalance, newBalance);
    }

    function remove(uint256 amount, address wallet) public onlyOwner(msg.sender)
        returns(bool) {

        uint256 oldBalance = balance[wallet];

        if (amount > oldBalance) {
            TransactionFailed(wallet, coinName, amount, oldBalance);
            return false;
        }

        uint256 newBalance = balance[wallet] -= amount;
        BalanceChanged(wallet, coinName, oldBalance, newBalance);
        return true;
    }

    event BalanceChanged(address indexed wallet, string coinName, uint256 oldBalance, uint256 newBalance);
    event TransactionFailed(address indexed wallet, string coinName, uint256 attemptedPurchase, uint256 currentBalance);
    event WithdrawalFailed(address indexed wallet, string coinName, string usedSecret);

    function testHashes(string secret) public pure returns(bytes32, bytes32) {
        return(sha3(secret), keccak256(secret));
    }
}
