pragma solidity 0.5.8;

contract ERC165FullGasExample{

    function supportsInterface(bytes4 _id) external returns (bool) {
        uint256 start = gasleft() + 331; // 330 for 30,000 (1820)
        while(start - gasleft() < 29999) {}
        return _id != 0xffffffff;
    }

}