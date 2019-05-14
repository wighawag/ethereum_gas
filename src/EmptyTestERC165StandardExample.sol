pragma solidity 0.5.8;

import "./ERC165.sol";
import "./ERC165Query.sol";

contract EmptyTestERC165StandardExample is ERC165Query {

    function test(address to, bytes4 id) external returns (bool) {
        if(doesContractImplementInterface(to, id)){
            
        }
    }

    function testSingleCall(address to, bytes4 id) external returns (bool) {
        (uint256 success, uint256 result) = noThrowCall(to, id);
        if ((success==1)&&(result==1)) {
            
        }
    }

}