// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

/// @title TODO
/// @author Turan Vural and Johans Ballestar
/// @notice TODO
/// @dev TODO
contract Beneficiary {

  /// @notice FLOW
  // 1. COMMAND: Mephisto store key {Payload}
  // Deploy Beneficiary contract by calling createBeneficiary in BeneficiaryFactory, passing in a hashed private key
  // 
  // 2. 
  // 3. 
  // 4.
  // 5.

  string version;
  string payloadEndpoint;
  uint lastCheckIn;
  address payable owner;
  string payload;
  bool lockPublishedKey;
  bool lockPayloadEndpoint;

  // set the `owner` of the contract and log first `checkIn`
  constructor(address _p) {
    //@TODO: Constructor Logic?
  }

  // a function modifier used to restrict most write functions to only
  // the contract owner
  /// @notice TODO
  /// @dev TODO
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  /// @param _key TODO
  function initialize(string memory _key) public onlyOwner{
    owner = payable(msg.sender);
    payload = _key;
    version = "0.0.1";
    checkIn();
  }

  // This function is restricted to work with only the contract owner.
  // friends don't let friends deploy contracts that can't be killed
  /// @notice TODO
  /// @dev TODO
  function kill() public onlyOwner {
    selfdestruct(owner);
  }

  // This function is restricted to work with only the contract owner.
  // `block.timestamp` is known to tolerate datestamp drift of up to
  // 900 seconds at the time of this writing, consider then when
  // setting TTL thresholds for the publisher.
  /// @notice TODO
  /// @dev TODO
  function checkIn() public onlyOwner {
    lastCheckIn = block.timestamp;
  }

  // Outputs the `uint` for the last `block.timestamp`
  // that registered to this contract on the blockchain.
  /// @notice TODO
  /// @dev TODO
  function getLastCheckIn() public view returns (uint) {
    return lastCheckIn;
  }

  // Outputs the `string` for the last `block.timestamp`
  // that registered to this contract on the blockchain.
  /// @notice TODO
  /// @dev TODO
  /// @return TODO
  function getPayloadEndpoint() public view returns (string memory) {
    return payloadEndpoint;
  }

  // This function is restricted to work with only the contract owner.
  // Sets the Payload Endpoint after checking max length of the string.
  // sets lockPayloadEndpoint to TRUE so that once set, this value can
  // not be changed.
  // Probably don't need
  /// @notice TODO
  /// @dev TODO
  function setPayloadEndpoint(string memory s) public onlyOwner {
    uint max = 512;
    require(bytes(s).length <= max);
    require(lockPayloadEndpoint == false);
    payloadEndpoint = s;
    lockPayloadEndpoint = true;
  }

  /// @notice TODO
  /// @dev TODO
  /// @return TODO
  function getOwner() public view returns (address) {
    return owner;
  }

  /// @notice TODO
  /// @dev TODO
  /// @return TODO
  function getVersion() public view returns (string memory) {
    return version;
  }

  // This function is restricted to work with only the contract owner.
  /// @notice TODO
  /// @dev TODO
  function setKey(string memory _key) public onlyOwner {
    uint max = 128;
    require(bytes(_key).length <= max);
    require(lockPublishedKey == false);
    payload = _key;
    lockPublishedKey = true;
  }
}