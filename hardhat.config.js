require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require('@openzeppelin/hardhat-upgrades')
require("dotenv").config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/components'
  },
  
  networks: {
    hardhat: {
      chainId: 1337
    },
    Huygens_dev: {
      url: process.env.HUYGENS_DEV_URL,
      accounts: [
        process.env.HUYGENS_DEV_PRIVATE_KEY
      ]
    },
    Huygens: {
      url: process.env.HUYGENS_URL,
      accounts: [
        process.env.HUYGENS_PRIVATE_KEY
      ]
    },
  }
};
