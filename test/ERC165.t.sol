// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.0;

import "forge-std/Test.sol";
import "src/TestERC165.sol";
import "src/TestERC165StandardExample.sol";
import "src/TestERC165StandardExampleViaCall.sol";
import "src/ERC165MoreGasExample.sol";
import "src/ERC165Query.sol";


contract ERC165Test is Test {
    TestERC165 internal instanceOfERC165;
    TestERC165StandardExample internal instanceOfERC165StandardExample;
    TestERC165StandardExampleViaCall internal instanceOfTestERC165StandardExampleViaCall;

    function setUp() public {
        instanceOfERC165 = new TestERC165();
        instanceOfERC165StandardExample = new TestERC165StandardExample();
        ERC165Query query = new ERC165Query();
        instanceOfTestERC165StandardExampleViaCall = new TestERC165StandardExampleViaCall(query);
    }

    function testERC165With34249() external {
        ERC165MoreGasExample instanceOfERC165MoreGasExample = new ERC165MoreGasExample(9600);
        vm.expectRevert(bytes("fails"));
        instanceOfERC165.test.gas(34249)(address(instanceOfERC165MoreGasExample), 0xeeeeeeee);
    }
    function testERC165With1000000() external {
        ERC165MoreGasExample instanceOfERC165MoreGasExample = new ERC165MoreGasExample(9600);
        vm.expectRevert(bytes("fails"));
        instanceOfERC165.test.gas(1000000)(address(instanceOfERC165MoreGasExample), 0xeeeeeeee);
    }


    function testStandardERC165With35000() external {
        ERC165MoreGasExample instanceOfERC165MoreGasExample = new ERC165MoreGasExample(10400);
        vm.expectRevert("fails");
        instanceOfERC165StandardExample.testSingleCall.gas(3500)(address(instanceOfERC165MoreGasExample), 0xeeeeeeee);
    }
    function testStandardERC165With1000000() external {
        ERC165MoreGasExample instanceOfERC165MoreGasExample = new ERC165MoreGasExample(10400);
        vm.expectRevert("fails");
        instanceOfERC165StandardExample.testSingleCall.gas(1000000)(address(instanceOfERC165MoreGasExample), 0xeeeeeeee);
    }



    function testStandardERC165ViaCallWith87500() external {
        ERC165MoreGasExample instanceOfERC165MoreGasExample = new ERC165MoreGasExample(21000);
        vm.expectRevert();
        instanceOfTestERC165StandardExampleViaCall.test.gas(87500- 21000)(address(instanceOfERC165MoreGasExample), 0xeeeeeeee);
    }
    function testStandardERC165ViaCallWith1000000() external {
        ERC165MoreGasExample instanceOfERC165MoreGasExample = new ERC165MoreGasExample(21000);
        vm.expectRevert(bytes("fails"));
        instanceOfTestERC165StandardExampleViaCall.test.gas(1000000)(address(instanceOfERC165MoreGasExample), 0xeeeeeeee);
    }

}
