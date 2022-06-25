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

const ERC165FullGasExample = getDeployedContract('ERC165FullGasExample');
const ERC165Example = getDeployedContract('ERC165Example');
const ERC165StorageExample = getDeployedContract('ERC165StorageExample');
const Test1820Registry = getDeployedContract('Test1820Registry');

tap.test('Nearly30000Gas', async(t) => {
    t.test('Nearly30000Gas: asking registry for 165 interface should succeed and call should throw', async () => {
        await expectThrow(tx({from: deployer, gas: 57411}, Test1820Registry, 'test165', ERC165FullGasExample.options.address, '0xeeeeeeee'));
    });
    
    t.test('Nearly30000Gas: it works when given enough gas', async() => {
        await expectThrow(tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', ERC165FullGasExample.options.address, '0xeeeeeeee'));
    })
})


tap.test('MinimalGas', async(t) => {
    t.test('MinimalGas: asking registry for 165 interface should succeed and call should throw', async () => {
        await expectThrow(tx({from: deployer, gas: 57411}, Test1820Registry, 'test165', ERC165Example.options.address, '0xeeeeeeee'));
    });
    
    t.test('MinimalGas: it works when given enough gas', async() => {
        await expectThrow(tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', ERC165Example.options.address, '0xeeeeeeee'));
    })
})

tap.test('StorageGas', async(t) => {
    t.test('StorageGas: asking registry for 165 interface should succeed and call should throw', async () => {
        await expectThrow(tx({from: deployer, gas: 57411}, Test1820Registry, 'test165', ERC165StorageExample.options.address, '0xeeeeeeee'));
    });
    
    t.test('StorageGas: it works when given enough gas', async() => {
        await expectThrow(tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', ERC165StorageExample.options.address, '0xeeeeeeee'));
    })
    
})


tap.test('HighGasLessThan30000', async(t) => {
    t.test('HighGasLessThan30000: asking registry for 165 interface should succeed and call should throw', async () => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 22000);
        await expectThrow(tx({from: deployer, gas: 97500}, Test1820Registry, 'test165', contract.options.address, '0xeeeeeeee'));
    });
    
    t.test('HighGasLessThan30000: it works when given enough gas', async() => {
        const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', 22000);
        await expectThrow(tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', contract.options.address, '0xeeeeeeee'));
    })
});
