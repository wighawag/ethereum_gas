const Web3 = require('web3');
const rocketh = require('rocketh');
const {
  deploy,
} = require('rocketh-web3')(rocketh, Web3); 

const gas = 6000000;

module.exports = async ({namedAccounts, initialRun}) => {
    const deployer = rocketh.accounts[0];

    await deploy('ERC165FullGasExample', {from:deployer, gas}, 'ERC165FullGasExample');
    await deploy('ERC165Example', {from:deployer, gas}, 'ERC165Example');
    await deploy('ERC165StorageExample', {from:deployer, gas}, 'ERC165StorageExample');
    await deploy('TestERC165', {from:deployer, gas}, 'TestERC165');
    const {contract} = await deploy('ERC165Query', {from:deployer, gas}, 'ERC165Query');
    await deploy('EmptyTestERC165', {from:deployer, gas}, 'EmptyTestERC165');
    await deploy('Test1820Registry', {from: deployer, gas}, 'Test1820Registry');
    await deploy('EmptyTest1820Registry', {from: deployer, gas}, 'EmptyTest1820Registry');
    await deploy('TestMinimal', {from: deployer, gas}, 'TestMinimal');
    await deploy('EmptyTestMinimal', {from: deployer, gas}, 'EmptyTestMinimal');
    await deploy('TestERC165StandardExample', {from: deployer, gas}, 'TestERC165StandardExample');
    await deploy('EmptyTestERC165StandardExample', {from: deployer, gas}, 'EmptyTestERC165StandardExample');
    await deploy('TestERC165StandardExampleViaCall', {from: deployer, gas}, 'TestERC165StandardExampleViaCall', contract.options.address);
    await deploy('EmptyTestERC165StandardExampleViaCall', {from: deployer, gas}, 'EmptyTestERC165StandardExampleViaCall', contract.options.address);
}