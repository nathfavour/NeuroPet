const hre = require("hardhat");

async function main() {
  // Get contract factory instances
  const NFTCharacter = await hre.ethers.getContractFactory("NFTCharacter");
  const GameEngine = await hre.ethers.getContractFactory("GameEngine");
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const MultichainBridge = await hre.ethers.getContractFactory("MultichainBridge");
  const ReputationSystem = await hre.ethers.getContractFactory("ReputationSystem");

  // Deploy NFTCharacter contract
  const nftCharacter = await NFTCharacter.deploy();
  await nftCharacter.waitForDeployment();
  console.log("NFTCharacter deployed to:", await nftCharacter.getAddress());

  // Deploy GameEngine contract
  const gameEngine = await GameEngine.deploy(nftCharacter.address);
  await gameEngine.waitForDeployment();
  console.log("GameEngine deployed to:", await gameEngine.getAddress());

  // Deploy Marketplace contract
  const marketplace = await Marketplace.deploy(nftCharacter.address);
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed to:", await marketplace.getAddress());

  // Deploy MultichainBridge contract
  const multichainBridge = await MultichainBridge.deploy(nftCharacter.address);
  await multichainBridge.waitForDeployment();
  console.log("MultichainBridge deployed to:", await multichainBridge.getAddress());

  // Deploy ReputationSystem contract
  const reputationSystem = await ReputationSystem.deploy();
  await reputationSystem.waitForDeployment();
  console.log("ReputationSystem deployed to:", await reputationSystem.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
