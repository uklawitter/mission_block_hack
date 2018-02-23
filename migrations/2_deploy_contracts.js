var CoinGenerator = artifacts.require("./BonusCoinGenerator.sol");

module.exports = function(deployer) {
  deployer.deploy(CoinGenerator);
};
