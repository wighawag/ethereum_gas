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

const TestERC165StandardExample = getDeployedContract('TestERC165StandardExample');

tap.test('triple call', async(t) => {

    t.test('triple call: should throw', async () => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 21000);
        await expectThrow(tx({from: deployer, gas: 87500}, TestERC165StandardExample, 'test', contract.options.address, '0xeeeeeeee'));
    });

    t.test('triple call: it works when given enough gas', async() => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 21000);
        await expectThrow(tx({from: deployer, gas: 1000000}, TestERC165StandardExample, 'test', contract.options.address, '0xeeeeeeee'));
    })    

});


tap.test('single call', async(t) => {

    t.test('single call: should throw', async () => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 10400);
        await expectThrow(tx({from: deployer, gas: 35000}, TestERC165StandardExample, 'testSingleCall', contract.options.address, '0xeeeeeeee'));
    });

    t.test('single call: it works when given enough gas', async() => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 10400);
        await expectThrow(tx({from: deployer, gas: 1000000}, TestERC165StandardExample, 'testSingleCall', contract.options.address, '0xeeeeeeee'));
    })    

});
