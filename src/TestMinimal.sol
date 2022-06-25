pragma solidity 0.6.0;

contract TestMinimal {

    function test(address to) external returns (bool) {
        require(!check(to), "fail");
    }

    function check(address _to) internal returns (bool) {
        bytes memory encodedParams = abi.encodeWithSignature("implementTest()");
        
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