import {ethers} from "hardhat"
async function main() {
  const storage = await ethers.getContractFactory("Storage");
  const storageDep = await storage.deploy();
  await storageDep.deployed();
  const contrAddr = storageDep.address;
  console.log(`Contract Address:${contrAddr}`);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
