pragma solidity 0.5.8;

contract MinimalExample{

    uint256 gas;
    constructor(uint256 _gas) public {
        gas = _gas;
    }

    function implementTest() external returns (bool) {
        uint256 start = gasleft();
        while(start - gasleft() < gas) {}
        return true;
    }
}