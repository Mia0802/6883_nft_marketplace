const { ethers, upgrades } = require("hardhat")

async function main() {
  const owner = await ethers.getSigners();
  // const owner = "0x4Bab021B0387Fe2437B1C2262aC504546De335Ba"
  const PixleU = await hre.ethers.getContractFactory("PixleU");
  const pixleu = await PixleU.deploy();

  await pixleu.deployed();

  let balance = pixleu.balanceOf(owner)
  console.log("PixleU deployed to:", pixleu.address);
  console.log(owner)

  balance.then(function(res){
    console.log('Initial balance', res)
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  