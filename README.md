# NFT Battle Game with Multichain Support

## Overview

This project is a decentralized gaming platform where users can mint and own NFT characters, engage in battles, and trade characters on a marketplace. Additionally, the platform offers cross-chain NFT support via a multichain bridge and tracks player reputation using an integrated reputation system.

## Contracts

### 1. `NFTCharacter.sol`
Manages the minting of NFT characters and their traits:
- **Mint Character**: Users can mint new characters with default traits.
- **Update Traits**: Character traits can be updated by the owner.
- **Character Traits**: Each character has traits like strength, agility, intelligence, and endurance.

### 2. `GameEngine.sol`
Handles the core gameplay mechanics:
- **Battle Simulation**: Simulates a battle between two characters, determining the winner based on their traits and awarding experience points.
- **Power Calculation**: Provides a method to calculate the total power of a character based on its traits.

### 3. `Marketplace.sol`
Facilitates the buying and selling of NFT characters:
- **List NFT**: Users can list their characters for sale on the marketplace.
- **Buy NFT**: Other users can purchase listed characters by paying the specified price.

### 4. `MultichainBridge.sol`
Allows NFT characters to be transferred across different blockchains:
- **Bridge NFT**: Locks or burns the NFT on the current chain and emits an event to facilitate the minting of the NFT on another chain.

### 5. `ReputationSystem.sol`
Tracks the reputation of players based on their actions:
- **Record Action**: Allows positive or negative actions to be recorded, which affects the player's reputation score.
- **Get Reputation**: Returns the current reputation score of a player.

## Setup and Deployment

### Prerequisites

- Node.js
- Hardhat
- A wallet with testnet funds (if deploying to a public network)

### Installation

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd <repo-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Compile contracts:
    ```bash
    npx hardhat compile
    ```

### Deployment

To deploy the contracts, run:

```bash
npx hardhat run scripts/deploy.js --network <network-name>

Interacting with the Contracts
Once deployed, you can interact with the contracts using the following methods:

Mint a Character:

javascript
Copy code
nftCharacter.mintCharacter(playerAddress, tokenURI);
Battle Simulation:

javascript
Copy code
gameEngine.battle(characterId1, characterId2);
List NFT for Sale:

javascript
Copy code
marketplace.listNFT(tokenId, price);
Buy an NFT:

javascript
Copy code
marketplace.buyNFT(tokenId, { value: price });
Bridge an NFT:

javascript
Copy code
multichainBridge.bridgeNFT(tokenId, destinationChain);
Record Player Action:

javascript
Copy code
reputationSystem.recordAction(playerAddress, true); // positive action
Running Tests
To run the tests for the contracts:

bash
Copy code
npx hardhat test
License
This project is licensed under the MIT License. See the LICENSE file for details.


This README provides a detailed overview of the contracts and instructions for deployment and interaction. Let me know if you need any further adjustments!
