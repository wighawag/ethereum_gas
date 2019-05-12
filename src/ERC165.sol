pragma solidity 0.5.8;

interface ERC165 {
    function supportsInterface(bytes4 _id) external returns (bool);
}