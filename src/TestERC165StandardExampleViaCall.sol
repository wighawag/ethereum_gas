pragma solidity 0.5.8;

import "./ERC165Query.sol";

contract TestERC165StandardExampleViaCall {

    ERC165Query query;
    constructor(ERC165Query _query) public {
        query = _query;
    }

    function test(address to, bytes4 id) external returns (bool) {
        if (query.doesContractImplementInterface(to, id)) {
            (bool success,) = to.call(abi.encodeWithSelector(id));
            require(success, "fails");
        }
    }

}
