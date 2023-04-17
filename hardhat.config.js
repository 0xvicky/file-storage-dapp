require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-ethers")
require("dotenv").config()
const RPC_MUMBAI = process.env.RPC_MUMBAI
const MUMBAI_KEY = process.env.PVT_MUMBAI
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    // goerli: {
    //   url: RPC__URL,
    //   accounts: [GOERLI__PRIVATE_KEY],
    //   chainId: 5,
    // },
    mumbai: {
      url: RPC_MUMBAI,
      accounts: [MUMBAI_KEY],
      chainId: 80001,
    },

    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
}
