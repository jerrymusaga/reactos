
const hre = require("hardhat");

async function main() {

  const Reactos = await hre.ethers.getContractFactory("Reactos");
  const reactos = await Reactos.deploy("Reactos", "RAT");

  await reactos.deployed();

  console.log(
    `Reactos deployed to ${reactos.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
