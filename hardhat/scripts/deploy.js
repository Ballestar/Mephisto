// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const beneficiary = "0x5278809c5d161213d3BAe6fd89bedd972e014ff9";
  const Trustee = await hre.ethers.getContractFactory("Trustee");
  const trustee = await Trustee.deploy(beneficiary);

  await trustee.deployed();

  console.log(`Trustee Contract deployed to ${trustee.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
