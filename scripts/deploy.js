
const hre = require("hardhat");

async function main() {

  const Reactos = await hre.ethers.getContractFactory("Reactos");
  const reactos = await Reactos.deploy("Reactos", "RAT");
  
  try {
    await reactos.deployed();
    console.log(
      `Reactos deployed to ${reactos.address}`
    );
  } catch(err){
    console.log(`Error: ${err.message}`);
  }

  

  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
