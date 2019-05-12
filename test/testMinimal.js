const tap = require('tap');
const assert = require('assert');
const Web3 = require('web3');
const rocketh = require('rocketh');
const {
    tx,
    getBalance,
    getDeployedContract,
    expectThrow,
    deploy,
} = require('rocketh-web3')(rocketh, Web3); 

const deployer = rocketh.accounts[0];
const gas = 600000;

const TestMinimal = getDeployedContract('TestMinimal');

tap.test('should throw', async () => {
    const {contract} = await deploy({from:deployer, gas}, 'MinimalExample', 10000);
    await expectThrow(tx({from: deployer, gas: 34201}, TestMinimal, 'test', contract.options.address));
});

tap.test('it works when given enough gas', async() => {
    const {contract} = await deploy({from:deployer, gas}, 'MinimalExample', 10000);
    await expectThrow(tx({from: deployer, gas: 1000000}, TestMinimal, 'test', contract.options.address));
})
  