import { ethers } from "hardhat";

async function main() {
  const Pulsar = await ethers.getContractFactory("Pulsar");
  const pulsar = await Pulsar.deploy("0xB4257F31750961C8e536f5cfCBb3079437700416");
  await pulsar.waitForDeployment();
  console.log(`deployed pulsar at ${pulsar.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
