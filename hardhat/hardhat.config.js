require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    //Optimism Goerli
    goerli: {
      url: process.env.OP_GOERLI_PROVIDER_URL,
      accounts:
        process.env.TEST_PRIVATE_KEY !== undefined
          ? [process.env.TEST_PRIVATE_KEY]
          : [],
    },
  },
};
