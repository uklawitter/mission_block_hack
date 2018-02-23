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

	await kl.allowWithdrawal(10, "0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a");

	await kl.withdraw("123456");
	var balance = await kl.getBalance.call();
	assert.equal(balance.toNumber(), 10);
    });

    it('should thorw an event if withdrawal failed', async () =>{
	var generator = await Generator.deployed();
	await generator.generateCoinContract("ABC");
	var address1 = await generator.getContractAdress.call("ABC");

	var kl = BonusCoin.at(address1);

	var tx = await kl.withdraw("123456");
	var gotEvent = false;

	for(var i = 0; i < tx.logs.length; i++) {
	    var log = tx.logs[i];
	    console.log(log.event);
	    if (log.event == "WithdrawalFailed"){
		gotEvent = true;
	    }
	}
	assert.equal(gotEvent, true, 'Did not receive WithdrawalFailed Event');

    });



});
