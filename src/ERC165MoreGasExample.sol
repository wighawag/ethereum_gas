pragma solidity 0.5.8;

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