// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract ReputationSystem {
    struct PlayerReputation {
        uint256 positiveActions;
        uint256 negativeActions;
        uint256 totalReputation;
    }

    mapping(address => PlayerReputation) public reputations;

    function recordAction(address player, bool positive) external {
        if (positive) {
            reputations[player].positiveActions++;
            reputations[player].totalReputation++;
        } else {
            reputations[player].negativeActions++;
            reputations[player].totalReputation--;
        }
    }

    function getReputation(address player) external view returns (uint256) {
        return reputations[player].totalReputation;
    }
}
