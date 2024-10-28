const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameEngine", function () {
  let gameEngine;
  let nftCharacter;
  let owner, player1, player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();

    const NFTCharacter = await ethers.getContractFactory("NFTCharacter");
    nftCharacter = await NFTCharacter.deploy();
    await nftCharacter.waitForDeployment();

    const GameEngine = await ethers.getContractFactory("GameEngine");
    gameEngine = await GameEngine.deploy(await nftCharacter.getAddress());
    await gameEngine.waitForDeployment();

    // Mint characters for testing
    await nftCharacter.mintCharacter(await player1.getAddress(), "uri1");
    await nftCharacter.mintCharacter(await player2.getAddress(), "uri2");
  });

  it("should calculate character power correctly", async function () {
    const power = await gameEngine.getCharacterPower(1);
    expect(power).to.equal(200n); // 50 + 50 + 50 + 50
  });

  it("should simulate a battle between characters", async function () {
    // Initiate the battle
    const tx = await gameEngine.battle(1, 2);
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Check if there are any events emitted
    if (receipt.logs && receipt.logs.length > 0) {
      console.log("Event logs:", receipt.logs);
      
      // Try to decode the event data
      const gameEngineInterface = gameEngine.interface;
      receipt.logs.forEach((log, index) => {
        try {
          const decodedLog = gameEngineInterface.parseLog(log);
          console.log(`Decoded log ${index}:`, decodedLog);
        } catch (error) {
          console.log(`Could not decode log ${index}:`, error.message);
        }
      });
    }

    // Since we can't directly access the battle result, let's check if the transaction was successful
    expect(receipt.status).to.equal(1); // 1 means success
  });
});

describe("Marketplace", function () {
  let marketplace;
  let nftCharacter;
  let owner, seller, buyer;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    const NFTCharacter = await ethers.getContractFactory("NFTCharacter");
    nftCharacter = await NFTCharacter.deploy();
    await nftCharacter.waitForDeployment();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(await nftCharacter.getAddress());
    await marketplace.waitForDeployment();

    // Mint an NFT for the seller
    await nftCharacter.mintCharacter(await seller.getAddress(), "uri1");
  });

  it("should list an NFT for sale", async function () {
    await nftCharacter.connect(seller).approve(await marketplace.getAddress(), 1);
    await marketplace.connect(seller).listNFT(1, ethers.parseEther("1"));

    const listing = await marketplace.listings(1);
    expect(listing.seller).to.equal(await seller.getAddress());
    expect(listing.price).to.equal(ethers.parseEther("1"));
    expect(listing.active).to.be.true;
  });

  it("should allow buying a listed NFT", async function () {
    await nftCharacter.connect(seller).approve(await marketplace.getAddress(), 1);
    await marketplace.connect(seller).listNFT(1, ethers.parseEther("1"));

    await marketplace.connect(buyer).buyNFT(1, { value: ethers.parseEther("1") });

    const newOwner = await nftCharacter.ownerOf(1);
    expect(newOwner).to.equal(await buyer.getAddress());
  });
});

describe("MultichainBridge", function () {
  let multichainBridge;
  let nftCharacter;
  let owner, player;

  beforeEach(async function () {
    [owner, player] = await ethers.getSigners();

    const NFTCharacter = await ethers.getContractFactory("NFTCharacter");
    nftCharacter = await NFTCharacter.deploy();
    await nftCharacter.waitForDeployment();

    const MultichainBridge = await ethers.getContractFactory("MultichainBridge");
    multichainBridge = await MultichainBridge.deploy(await nftCharacter.getAddress());
    await multichainBridge.waitForDeployment();

    // Mint an NFT for the player
    await nftCharacter.mintCharacter(await player.getAddress(), "uri1");
  });

  it("should bridge an NFT", async function () {
    await nftCharacter.connect(player).approve(await multichainBridge.getAddress(), 1);

    await expect(multichainBridge.connect(player).bridgeNFT(1, "Ethereum"))
      .to.emit(multichainBridge, 'NFTBridged')
      .withArgs(1, "Ethereum");

    const newOwner = await nftCharacter.ownerOf(1);
    expect(newOwner).to.equal(await multichainBridge.getAddress());
  });
});

describe("NFTCharacter", function () {
  let nftCharacter;
  let owner, player;

  beforeEach(async function () {
    [owner, player] = await ethers.getSigners();

    const NFTCharacter = await ethers.getContractFactory("NFTCharacter");
    nftCharacter = await NFTCharacter.deploy();
    await nftCharacter.waitForDeployment();
  });

  it("should mint a new character", async function () {
    await expect(nftCharacter.mintCharacter(await player.getAddress(), "uri1"))
      .to.emit(nftCharacter, 'Transfer')
      .withArgs(ethers.ZeroAddress, await player.getAddress(), 1);

    const traits = await nftCharacter.characterTraits(1);
    expect(traits.strength).to.equal(50);
    expect(traits.intelligence).to.equal(50);
    expect(traits.agility).to.equal(50);
    expect(traits.endurance).to.equal(50);
  });

  it("should update character traits", async function () {
    await nftCharacter.mintCharacter(await player.getAddress(), "uri1");
    await nftCharacter.connect(player).updateCharacterTraits(1, [60, 70, 80, 90]);

    const traits = await nftCharacter.characterTraits(1);
    expect(traits.strength).to.equal(60);
    expect(traits.intelligence).to.equal(70);
    expect(traits.agility).to.equal(80);
    expect(traits.endurance).to.equal(90);
  });
});