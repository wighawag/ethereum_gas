pragma solidity 0.5.8;

contract ERC165StorageExample{

    mapping (bytes4 => bool) supported;
    constructor() public {
        supported[0x01ffc9a7] = true;
        supported[0xeeeeeeee] = true;
    }

    function supportsInterface(bytes4 _id) external returns (bool) {
        return supported[_id];
    }
}