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

const TestERC165 = getDeployedContract('TestERC165');
const EmptyTestERC165 = getDeployedContract('EmptyTestERC165');

tap.test('9600 gas', async(t) => {

    t.test('should throw', async () => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 9600);
        await expectThrow(tx({from: deployer, gas: 34249}, TestERC165, 'test', contract.options.address, '0xeeeeeeee'));
    });

    t.test('it works when given enough gas', async() => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 9600);
        await expectThrow(tx({from: deployer, gas: 1000000}, TestERC165, 'test', contract.options.address, '0xeeeeeeee'));
    })    

});
