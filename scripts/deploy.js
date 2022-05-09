const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const PixleU = await hre.ethers.getContractFactory("PixleU");
  const pixleu = await PixleU.deploy();

  await pixleu.deployed();

  console.log("PixleU deployed to:", pixleu.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
