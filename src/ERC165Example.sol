pragma solidity 0.5.8;

contract ERC165Example{

    function supportsInterface(bytes4 _id) external returns (bool) {
        return _id != 0xffffffff;
    }
}