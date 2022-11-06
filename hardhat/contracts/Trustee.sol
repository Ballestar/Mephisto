// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Mephisto
/// @author Turan Vural and Johans Ballestar
/// @notice trustless deadman's switch
contract Trustee {

  string version;
  uint lastCheckIn;
  uint unlockDate;
  address payable owner;
  address payable beneficiary;

  event Withdraw ();

  // set the `owner` of the contract and log first `checkIn`
  constructor(address payable _beneficiary) {
    owner = payable(msg.sender);
    beneficiary = _beneficiary;
    version = "1.0.0";
    checkIn();
  }

  // a function modifier used to restrict most write functions to only
  // the contract owner
  /// @notice TODO
  /// @dev TODO
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  modifier defense {
    require(msg.sender == owner || msg.sender == beneficiary);
    _;
  }

  /// @notice This function is restricted to work with only the contract owner and kills the switch
  function kill() public onlyOwner {
    selfdestruct(owner);
  }

  // This function is restricted to work with only the contract owner.
  // `block.timestamp` is known to tolerate datestamp drift of up to
  // 900 seconds at the time of this writing, consider then when
  // setting TTL thresholds for the publisher.
  /// @notice TODO
  /// @dev only th owner can check in
  function checkIn() public onlyOwner {
    lastCheckIn = block.timestamp;

    //@dev WARNING: This is a vulnerability risk, Every year is not equal to 365 days
    unlockDate = lastCheckIn + 365 days;
  }

  function ableToWithdraw() public defense returns (bool)  {
    require(block.timestamp >= unlockDate, "You can't withdraw yet");
    emit Withdraw();
    return true;
  }


  /// @notice public method which returns the last time the switch was checked in
  /// @dev TODO
  /// @return the `uint` for the last `block.timestamp`
  function getLastCheckIn() public view defense returns (uint) {
    return lastCheckIn;
  }

  /// @notice TODO
  /// @dev TODO
  /// @return TODO
  function getOwner() public view defense returns (address) {
    return owner;
  }


  /// @notice TODO
  /// @dev TODO
  /// @return TODO
  function getBeneficiary() public view defense returns (address) {
    return beneficiary;
  }

  /// @notice TODO
  /// @dev TODO
  /// @return TODO
  function getVersion() public view returns (string memory) {
    return version;
  }
}