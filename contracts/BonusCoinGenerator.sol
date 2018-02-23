pragma solidity ^0.4.19;

import "./BonusCoinContract.sol";

contract BonusCoinGenerator {

  mapping (string => address) public deployedCoins;

  function generateCoinContract(string coinName) public returns (address) {
    if(deployedCoins[coinName] == address(0x0)){
      BonusCoinContract a = new BonusCoinContract(coinName, msg.sender);
      deployedCoins[coinName] =  a;
      return a;
    } else {
      return deployedCoins[coinName];
    }
  }

}
