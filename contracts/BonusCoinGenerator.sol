pragma solidity ^0.4.19;

import "./BonusCoinContract.sol";

contract BonusCoinGenerator {

  mapping (bytes32 => address) public deployedCoins;

  function generateCoinContract(string coinName) public returns (address) {
    bytes32 nameHash = keccak256(coinName);
    if(deployedCoins[nameHash] == address(0x0)){
      BonusCoinContract a = new BonusCoinContract(coinName, msg.sender);
      deployedCoins[nameHash] =  a;
      return a;
    } else {
      return deployedCoins[nameHash];
    }
  }

  function getContractAdress(string coinName) constant public returns (address){
    return deployedCoins[keccak256(coinName)];
  }

}
