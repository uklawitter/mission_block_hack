let Generator = artifacts.require('./BonusCoinGenerator.sol');
let BonusCoin = artifacts.require( "./BonusCoinContract.sol");
var web3 = require('web3');



contract('generator', function(accounts){

    it('address should not change when deploying twice', async () =>{
	var generator = await Generator.deployed();
	var tx1 = await generator.generateCoinContract("KL");
	var address1 = await generator.getContractAdress.call("KL");
	
	var tx2 = await generator.generateCoinContract("KL");
	var address2 = await generator.getContractAdress.call("KL");
	
	assert.equal(address1, address2, 'addresses are not equal');


	var kl = BonusCoin.at(address1);

	await kl.allowWithdrawal(10, web3.utils.sha3("123456"));

	await kl.withdraw("123456");

	assert.equal(await kl.getBalance.call(), 10);
    });



});
