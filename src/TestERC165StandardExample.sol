pragma solidity 0.6.0;

import "./ERC165Query.sol";

contract TestERC165StandardExample is ERC165Query {

    function test(address to, bytes4 id) external returns (bool) {
        if (doesContractImplementInterface(to, id)) {
            (bool success,) = to.call(abi.encodeWithSelector(id));
            require(success, "fails");
        }
    }

    function testSingleCall(address to, bytes4 id) external returns (bool) {
        (uint256 success, uint256 result) = noThrowCall(to, id);
        if ((success==1)&&(result==1)) {
            (bool success,) = to.call(abi.encodeWithSelector(id));
            require(success, "fails");
        }
    }

}
