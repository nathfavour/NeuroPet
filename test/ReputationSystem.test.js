const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReputationSystem", function () {
  let ReputationSystem;
  let reputationSystem;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    ReputationSystem = await ethers.getContractFactory("ReputationSystem");
    reputationSystem = await ReputationSystem.deploy();
  });

  it("Should record positive and negative actions", async function () {
    await reputationSystem.recordAction(addr1.address, true); // Positive action
    await reputationSystem.recordAction(addr1.address, false); // Negative action

    const reputation = await reputationSystem.getReputation(addr1.address);

    expect(reputation).to.equal(0); // One positive and one negative action
  });


  it("Should increase reputation with positive actions", async function () {
    await reputationSystem.recordAction(addr1.address, true); // Positive action
    await reputationSystem.recordAction(addr1.address, true); // Another positive action

    const reputation = await reputationSystem.getReputation(addr1.address);
    expect(reputation).to.equal(2); // 2 positive actions
  });
});
