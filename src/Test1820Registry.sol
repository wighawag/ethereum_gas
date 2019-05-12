pragma solidity 0.5.8;

import "openzeppelin-solidity/contracts/drafts/IERC1820Registry.sol";

contract Test1820Registry {

    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

    event Check(bool success);
    function test165(address to, bytes4 id) external returns (bool) {
        address implementer = _erc1820.getInterfaceImplementer(to, id);
        if (implementer != address(0)) {
            emit Check(true);
            (bool success,) = to.call(abi.encodeWithSelector(id));
            require(success, "fails");
        }
    }

}