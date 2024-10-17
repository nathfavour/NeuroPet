// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCharacter is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct CharacterTraits {
        uint8 strength;
        uint8 intelligence;
        uint8 agility;
        uint8 endurance;
    }

    mapping(uint256 => CharacterTraits) public characterTraits;

    constructor() ERC721("AICharacter", "AIC") {}

    function mintCharacter(address player, string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 newCharacterId = _tokenIds.current();
        
        // Default traits, could be evolved later
        characterTraits[newCharacterId] = CharacterTraits(50, 50, 50, 50);

        _mint(player, newCharacterId);
        _setTokenURI(newCharacterId, tokenURI);

        return newCharacterId;
    }

    function updateCharacterTraits(uint256 tokenId, CharacterTraits memory newTraits) external {
        require(ownerOf(tokenId) == msg.sender, "Not your character.");
        characterTraits[tokenId] = newTraits;
    }
}
