pragma solidity 0.5.8;

import "./ERC165.sol";

contract TestERC165 {

    bytes4 private constant _INTERFACE_ID_INVALID = 0xffffffff;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    event ERC165Result(bool success, bool result);

    function test(ERC165 _to, bytes4 _id) external returns (bool) {
        bytes memory encodedParams = abi.encodeWithSelector(_INTERFACE_ID_ERC165, _id);
        bool result;
        bool success;

        // solium-disable-next-line security/no-inline-assembly
        assembly {
            let encodedParams_data := add(0x20, encodedParams)
            let encodedParams_size := mload(encodedParams)

            let output := mload(0x40)    // Find empty storage location using "free memory pointer"
            mstore(output, 0x0)

            success := staticcall(
                30000,                   // 30k gas
                _to,                 // To addr
                encodedParams_data,
                encodedParams_size,
                output,
                0x20                     // Outputs are 32 bytes long
            )

            result := mload(output)      // Load the result
        }
        emit ERC165Result(success, result);

        return success && result;
    }
}