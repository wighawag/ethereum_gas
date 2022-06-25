pragma solidity 0.6.0;

import "./ERC165.sol";
import "./ERC165Query.sol";

contract EmptyTestERC165StandardExampleViaCall {

    ERC165Query query;
    constructor(ERC165Query _query) public {
        query = _query;
    }

    function test(address to, bytes4 id) external returns (bool) {
        if (query.doesContractImplementInterface(to, id)) {
            
        }
    }

}