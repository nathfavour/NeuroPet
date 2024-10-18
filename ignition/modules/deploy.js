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

  // Use the already deployed NFTCharacter address
  const nftCharacterAddress = "0x7516abedc7e8ca01143ad636a6963B9887FC7Cf6"; // Ensure this is correct

  // Deploy GameEngine contract, passing the NFTCharacter address
  const gameEngine = await GameEngine.deploy(nftCharacterAddress); // Use the known address
  await gameEngine.waitForDeployment();
  console.log("GameEngine deployed to:", await gameEngine.getAddress());

  // Deploy Marketplace contract, passing the NFTCharacter address
  const marketplace = await Marketplace.deploy(nftCharacterAddress); // Use the known address
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed to:", await marketplace.getAddress());

  // Deploy MultichainBridge contract, passing the NFTCharacter address
  const multichainBridge = await MultichainBridge.deploy(nftCharacterAddress); // Use the known address
  await multichainBridge.waitForDeployment();
  console.log("MultichainBridge deployed to:", await multichainBridge.getAddress());

  // Deploy ReputationSystem contract (no dependency on NFTCharacter)
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
