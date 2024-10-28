# NFT Battle Game with Multichain Support

## Table of Contents
1. [Overview](#overview)
2. [Contracts](#contracts)
   - [NFTCharacter.sol](#1-nftcharactersol)
   - [GameEngine.sol](#2-gameenginesol)
   - [Marketplace.sol](#3-marketplacesol)
   - [MultichainBridge.sol](#4-multichainbridgesol)
   - [ReputationSystem.sol](#5-reputationsystemsol)
3. [Setup and Deployment](#setup-and-deployment)
4. [Test Case Coverage](#test-case-coverage)
5. [License](#license)



 ## 1.  Overview

This project is a decentralized gaming platform where users can mint and own NFT characters, engage in battles, and trade characters on a marketplace. Additionally, the platform offers cross-chain NFT support via a multichain bridge and tracks player reputation using an integrated reputation system.

 ## 2.  Contracts

1. ###  `NFTCharacter.sol`
Manages the minting of NFT characters and their traits:
- **Mint Character**: Users can mint new characters with default traits.
- **Update Traits**: Character traits can be updated by the owner.
- **Character Traits**: Each character has traits like strength, agility, intelligence, and endurance.

2. ###  `GameEngine.sol`
Handles the core gameplay mechanics:
- **Battle Simulation**: Simulates a battle between two characters, determining the winner based on their traits and awarding experience points.
- **Power Calculation**: Provides a method to calculate the total power of a character based on its traits.

3. ###  `Marketplace.sol`
Facilitates the buying and selling of NFT characters:
- **List NFT**: Users can list their characters for sale on the marketplace.
- **Buy NFT**: Other users can purchase listed characters by paying the specified price.

4. ###  `MultichainBridge.sol`
Allows NFT characters to be transferred across different blockchains:
- **Bridge NFT**: Locks or burns the NFT on the current chain and emits an event to facilitate the minting of the NFT on another chain.

5. ###  `ReputationSystem.sol`
Tracks the reputation of players based on their actions:
- **Record Action**: Allows positive or negative actions to be recorded, which affects the player's reputation score.
- **Get Reputation**: Returns the current reputation score of a player.

 ## 3. Setup and Deployment

### Prerequisites

- Node.js
- Hardhat
- A wallet with testnet funds (EMC testnet)

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/Hackathonzx/NeuroPet.git
    cd NeuroPet
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Compile contracts:
    ```
    npx hardhat compile
    ```

### Deployment

To deploy the contracts, run:

```
npx hardhat run ignition/modules/deploy.js --network EdgeMatrixChainTestnet

Here are the deployed contract addresses:

   NFTCharacter deployed to: 0x7516abedc7e8ca01143ad636a6963B9887FC7Cf6
   GameEngine deployed to: 0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55
   Marketplace deployed to: 0x41CD3d7753eeAD4c2d384a6C0074eA4c27dE36F1
   MultichainBridge deployed to: 0x1d8c981FD95060A45b3Cea346DbF7b5b48f5CD36
   ReputationSystem deployed to: 0xf1979Ac32D086D1f3f3773fe0828d37729ed545f

Running Tests

To run the tests for the contracts:

npx hardhat test

Test Case Coverage for 'NeuroPets' Project
The test suite for the 'NeuroPets' project ensures the correctness and expected behavior of the following core functionalities:

NFTCharacter Contract:

Minting Characters: Tests if players can successfully mint new character NFTs with unique attributes.
Character Evolution: Verifies that characters evolve based on gameplay events.
Metadata Updates: Ensures that metadata of NFTs (e.g., levels, abilities) updates correctly as characters evolve.
Ownership: Confirms the correct transfer of NFT ownership during trades.

GameEngine Contract:

Gameplay Events: Simulates in-game actions and tests their effect on character stats.
Battle Mechanism: Ensures battles between characters result in the expected outcomes.
Reward Distribution: Tests if rewards are accurately distributed to players after completing missions.

Marketplace Contract:

Listing Items: Verifies that players can list their NFTs for sale with appropriate pricing.
Purchasing NFTs: Tests the purchasing flow, including proper token transfers and ownership changes.
Delisting Items: Ensures users can delist their NFTs from the marketplace without issues.

MultichainBridge Contract:

Cross-Chain NFT Transfers: Ensures NFTs can be locked on the source chain and minted on the target chain correctly.
Interoperability: Tests the integration with multiple blockchains for seamless NFT transfers.
Event Handling: Verifies the correct handling of cross-chain events for smooth NFT migrations.

ReputationSystem Contract:

Reputation Assignment: Ensures players' reputations are updated based on their actions within the game.
Reputation-Based Rewards: Verifies that rewards and penalties are distributed based on player reputation scores.
Voting Mechanism: Tests the governance voting system for players to influence game changes based on reputation.

4. ### Test Case Coverage for 'NeuroPets' Project

The test suite ensures the correctness and expected behavior of the core functionalities across all smart contracts. Thorough testing is crucial to guarantee the smooth operation of gameplay mechanics, marketplace activities, cross-chain transfers, and reputation management.

npx hardhat test

Example test output:


  GameEngine
    ✔ should calculate character power correctly
    ✔ should simulate a battle between characters

  Marketplace
    ✔ should list an NFT for sale
    ✔ should allow buying a listed NFT

  MultichainBridge
    ✔ should bridge an NFT

  NFTCharacter
    ✔ should mint a new character
    ✔ should update character traits

  ReputationSystem
    ✔ Should record positive and negative actions
    ✔ Should increase reputation with positive actions


  9 passing (2s)

 # 5. License
This project is licensed under the MIT License. See the LICENSE file for details.


