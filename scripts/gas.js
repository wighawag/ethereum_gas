const Web3 = require('web3');
const rocketh = require('rocketh');

const {
    tx,
    getBalance,
    getDeployedContract,
    deploy,
  } = require('rocketh-web3')(rocketh, Web3); 

const deployer = rocketh.accounts[0];
const gas = 600000;

async function main() {
    const ERC165FullGasExample = getDeployedContract('ERC165FullGasExample');
    const ERC165Example = getDeployedContract('ERC165Example');
    const ERC165StorageExample = getDeployedContract('ERC165StorageExample');
    const ERC165MoreGasExample = getDeployedContract('ERC165MoreGasExample');
    const TestERC165 = getDeployedContract('TestERC165');
    const Test1820Registry = getDeployedContract('Test1820Registry');
    const EmptyTest1820Registry = getDeployedContract('EmptyTest1820Registry');
    const TestMinimal = getDeployedContract('TestMinimal');
    const EmptyTestMinimal = getDeployedContract('EmptyTestMinimal');
    
    let receipt;

    // const simpleReceipt = await tx({from: deployer, gas}, TestERC165, 'test', ERC165Example.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(simpleReceipt, null, '  '));

    // const fullGasReceipt = await tx({from: deployer, gas}, TestERC165, 'test', ERC165FullGasExample.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(fullGasReceipt, null, '  '));


    // show problem with ERC1820 handling of ERC165 : 
    // receipt = await tx({from: deployer, gas: 57411}, Test1820Registry, 'test165', ERC165FullGasExample.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(receipt, null, '  '));
    // receipt = await tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', ERC165FullGasExample.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(receipt, null, '  '));

    async function emptyTestERC165MoreGasExampleWith(gasUse) {
      const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', gasUse);
      receipt = await tx({from: deployer, gas: 1000000}, EmptyTest1820Registry, 'test165', contract.options.address, '0xeeeeeeee');
      console.log(JSON.stringify(receipt, null, '  '));
    }

    async function testERC165MoreGasExampleWith(gasUse, gasProvided) {
      const {contract} = await deploy({from:deployer, gas}, 'ERC165MoreGasExample', gasUse);
      receipt = await tx({from: deployer, gas: gasProvided}, Test1820Registry, 'test165', contract.options.address, '0xeeeeeeee');
      console.log(JSON.stringify(receipt, null, '  '));
      receipt = await tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', contract.options.address, '0xeeeeeeee');
      console.log(JSON.stringify(receipt, null, '  '));
    }

    // await testERC165MoreGasExampleWith(25000, 105000); // VERIFIED
    // await testERC165MoreGasExampleWith(24000, 103000); // VERIFIED
    // await testERC165MoreGasExampleWith(23000, 100000); // VERIFIED
    // await testERC165MoreGasExampleWith(22000, 97500); // VERIFIED

    // await testERC165MoreGasExampleWith(21000, 95582); // lower => out of gas


    async function emptyTestMinimalExampleWith(gasUse) {
      const {contract} = await deploy({from:deployer, gas}, 'MinimalExample', gasUse);
      receipt = await tx({from: deployer, gas: 1000000}, EmptyTestMinimal, 'test', contract.options.address);
      console.log(JSON.stringify(receipt, null, '  '));
    }
    async function testMinimalExampleWith(gasUse, gasProvided) {
      const {contract} = await deploy({from:deployer, gas}, 'MinimalExample', gasUse);
      receipt = await tx({from: deployer, gas: gasProvided}, TestMinimal, 'test', contract.options.address);
      console.log(JSON.stringify(receipt, null, '  '));
      // receipt = await tx({from: deployer, gas: 1000000}, TestMinimal, 'test', contract.options.address);
      // console.log(JSON.stringify(receipt, null, '  '));
    }

    // await emptyTestMinimalExampleWith(10000); // 34201
    // await emptyTestMinimalExampleWith(9000); // 33233
    // await emptyTestMinimalExampleWith(8000); // 32201
    // await emptyTestMinimalExampleWith(7000); // 31297
    // await emptyTestMinimalExampleWith(6000); // 30087
    // await emptyTestMinimalExampleWith(5950); // 30087
    // await emptyTestMinimalExampleWith(5500); // 29603
    // await emptyTestMinimalExampleWith(5000); // 29119
   
    
    // await testMinimalExampleWith(10000, 34201); // VERIFIED
    // await testMinimalExampleWith(9000, 33287); // lower => out of gas

    // await testMinimalExampleWith(6000, 30200); /// ???

    // await emptyTestMinimalExampleWith(5950);
    // await testMinimalExampleWith(5950, 30141);  // lower => out of gas

    // await emptyTestMinimalExampleWith(5900);
    // await testMinimalExampleWith(5900, 30141);  // lower => out of gas

    // await emptyTestMinimalExampleWith(5800);
    // await testMinimalExampleWith(5800, 30141);  // lower => out of gas

    // await emptyTestMinimalExampleWith(5700);
    // await testMinimalExampleWith(5700, 29888);  // lower => out of gas

    // await emptyTestMinimalExampleWith(5500);
    // await testMinimalExampleWith(5500, 29657);  // lower => out of gas

    // await emptyTestMinimalExampleWith(5000);
    // await testMinimalExampleWith(5000, 29173); // lower => out of gas

    
    // receipt = await tx({from: deployer, gas: 33197}, Test1820Registry, 'test165', ERC165StorageExample.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(receipt, null, '  '));
    // receipt = await tx({from: deployer, gas: 1000000}, Test1820Registry, 'test165', ERC165StorageExample.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(receipt, null, '  '));

    // receipt = await tx({from: deployer, gas}, Test, 'test165', ERC165Example.options.address, '0xeeeeeeee');
    // console.log(JSON.stringify(receipt, null, '  '));

}
main();
