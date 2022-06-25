pragma solidity 0.6.0;

contract ERC165Example{

    function supportsInterface(bytes4 _id) external returns (bool) {
        return _id != 0xffffffff;
    }
}