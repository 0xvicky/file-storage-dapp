// import {ethers} from "hardhat"
const hre = require("hardhat")
async function main() {
  const storage = await hre.ethers.getContractFactory("Storage")
  const storageDep = await storage.deploy("100")
  await storageDep.deployed()
  const contrAddr = storageDep.address
  console.log(`Contract Address:${contrAddr}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
