const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();
const { time } = require("@nomicfoundation/hardhat-network-helpers");
describe("TrusteeFactory", function () {
  async function deployTrustee() {
    const [_owner, _beneficiary] = await ethers.getSigners();
    //deploy contract
    const Trustee = await ethers.getContractFactory("Trustee");
    const trustee = await Trustee.deploy(_beneficiary.address);

    console.log(trustee.functions);
    return { trustee, _owner, _beneficiary };
  }

  it("Deploy trustee", async function () {
    await deployTrustee();
  });

  it("Check owner", async function () {
    const { trustee, _owner } = await deployTrustee();
    expect(await trustee.getOwner()).to.equal(_owner.address);
  });

  it("Check beneficiary", async function () {
    const { trustee, _beneficiary } = await deployTrustee();
    expect(await trustee.getBeneficiary()).to.equal(_beneficiary.address);
  });

  it("Check Withdraw", async function () {
    const { trustee } = await deployTrustee();
    await expect(trustee.ableToWithdraw()).to.be.revertedWith(
      "You can't withdraw yet"
    );
    await time.increase(365 * 24 * 60 * 60);
    await expect(trustee.ableToWithdraw()).to.not.be.reverted;
  });
});
