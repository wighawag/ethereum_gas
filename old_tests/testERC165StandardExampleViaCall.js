const tap = require('tap');
const assert = require('assert');
const Web3 = require('web3');
const rocketh = require('rocketh');
const {
    tx,
    getDeployedContract,
    expectThrow,
    deploy,
} = require('rocketh-web3')(rocketh, Web3); 

const deployer = rocketh.accounts[0];
const gas = 600000;

const TestERC165StandardExampleViaCall = getDeployedContract('TestERC165StandardExampleViaCall');

tap.test('should throw', async () => {
    const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 21000);
    await expectThrow(tx({from: deployer, gas: 87500}, TestERC165StandardExampleViaCall, 'test', contract.options.address, '0xeeeeeeee'));
});

tap.test('it works when given enough gas', async() => {
    const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 21000);
    await expectThrow(tx({from: deployer, gas: 1000000}, TestERC165StandardExampleViaCall, 'test', contract.options.address, '0xeeeeeeee'));
})    

