pragma solidity 0.6.0;

contract ERC165MoreGasExample {

    uint256 gas;
    constructor(uint256 _gas) public {
        gas = _gas;
    }
    
    function supportsInterface(bytes4 _id) external returns (bool) {
        uint256 start = gasleft();
        while(start - gasleft() < gas) {}
        return _id != 0xffffffff;
    }
}