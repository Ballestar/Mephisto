// //SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/proxy/Clones.sol";
// import {Trustee} from "./Trustee.sol";

// /// @title Mephisto Protocol
// contract TrusteeFactory {
//     uint256 public vaultCount;
//     mapping (uint256 => address) public vaults;

//     address public trusteeLogic;


//     constructor(){
//         trusteeLogic = address(new Trustee(msg.sender));
//     }

//     function createTrustee() external
//         returns (uint256 _vaultId)
//     {
//         address trustee = Clones.clone(trusteeLogic);
//         Trustee(trustee).initialize();

//         _vaultId = vaultCount++;
//         vaults[_vaultId] = trustee;
//         // TODO emit some event
//     }
// }