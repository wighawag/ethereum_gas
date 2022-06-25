pragma solidity 0.6.0;

import "./ERC165.sol";

contract TestERC165 {

    bytes4 private constant _INTERFACE_ID_INVALID = 0xffffffff;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    function test(address to, bytes4 id) external returns (bool) {
        if (isInterfaceSupported(to, id)) {
            (bool success,) = to.call(abi.encodeWithSelector(id));
            require(success, "fails");
        }
    }

    function isInterfaceSupported(address _to, bytes4 _id) internal returns (bool) {
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

        return success && result;
    }
}