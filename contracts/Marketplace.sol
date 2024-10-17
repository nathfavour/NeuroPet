// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {
    IERC721 public nft;

    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    constructor(address nftAddress) {
        nft = IERC721(nftAddress);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(nft.ownerOf(tokenId) == msg.sender, "You do not own this NFT.");
        listings[tokenId] = Listing(msg.sender, price, true);
        nft.transferFrom(msg.sender, address(this), tokenId);
    }

    function buyNFT(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(listing.active, "NFT not for sale.");
        require(msg.value == listing.price, "Incorrect price.");

        listings[tokenId].active = false;
        nft.transferFrom(address(this), msg.sender, tokenId);
        payable(listing.seller).transfer(msg.value);
    }
}
