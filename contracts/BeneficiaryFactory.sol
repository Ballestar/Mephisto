//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import {Beneficiary} from "./beneficiary.sol";

/// @title Mephisto Protocol
contract BeneficiaryFactory {
    uint256 public vaultCount;
    mapping (uint256 => address) public vaults;

    address public beneficiaryLogic;


    constructor(){
        beneficiaryLogic = address(new Beneficiary(msg.sender));
    }

    function createBeneficiary(string memory _key) external
        returns (uint256 _vaultId)
    {
        address beneficiary = Clones.clone(beneficiaryLogic);
        Beneficiary(beneficiary).initialize(_key);

        _vaultId = vaultCount++;
        vaults[_vaultId] = beneficiary;
        // TODO emit some event
    }
}