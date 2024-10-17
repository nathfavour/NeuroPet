// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCharacter.sol";

contract GameEngine {
    NFTCharacter public nftCharacter;

    constructor(address nftCharacterAddress) {
        nftCharacter = NFTCharacter(nftCharacterAddress);
    }

    struct BattleOutcome {
        uint256 characterId;
        bool victory;
        uint8 experienceGained;
    }

    // Function to calculate character power
    function calculatePower(uint256 characterId) internal view returns (uint256) {
        (
            uint8 strength,
            uint8 agility,
            uint8 intelligence,
            uint8 endurance
        ) = nftCharacter.characterTraits(characterId);

        return uint256(strength) + uint256(agility) + uint256(intelligence) + uint256(endurance);
    }

    // Function to calculate experience based on battle outcome
    function calculateExperience(bool isWinner) internal pure returns (uint8) {
        return isWinner ? 5 : 2;
    }

    // Simulate a battle between characters
    function battle(uint256 characterId1, uint256 characterId2) public returns (BattleOutcome memory outcome1, BattleOutcome memory outcome2) {
        // Calculate power for both characters
        uint256 power1 = calculatePower(characterId1);
        uint256 power2 = calculatePower(characterId2);

        // Determine the outcome based on power
        bool character1Wins = power1 > power2;
        bool character2Wins = power2 > power1;

        // Assign experience gained
        outcome1 = BattleOutcome({
            characterId: characterId1,
            victory: character1Wins,
            experienceGained: calculateExperience(character1Wins)
        });

        outcome2 = BattleOutcome({
            characterId: characterId2,
            victory: character2Wins,
            experienceGained: calculateExperience(character2Wins)
        });

        return (outcome1, outcome2);
    }

    // Function to check the character's current power level (sum of all traits)
    function getCharacterPower(uint256 characterId) public view returns (uint256 power) {
        return calculatePower(characterId);
    }
}
