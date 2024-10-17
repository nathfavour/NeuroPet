// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./NFTCharacter.sol";

contract MultichainBridge {
    event NFTBridged(uint256 indexed tokenId, string destinationChain);

    NFTCharacter public nftCharacter;

    constructor(address nftAddress) {
        nftCharacter = NFTCharacter(nftAddress);
    }

    function bridgeNFT(uint256 tokenId, string memory destinationChain) external {
        require(nftCharacter.ownerOf(tokenId) == msg.sender, "Not your NFT.");

        // Burn NFT on this chain (or lock it)
        nftCharacter.transferFrom(msg.sender, address(this), tokenId);

        emit NFTBridged(tokenId, destinationChain);
    }
}
