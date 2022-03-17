const CrowdFunding = artifacts.require("CrowdFunding");

contract("CrowdFunding", async (address) => {
  let crowdFunding;

  before(async () => {
    crowdFunding = await CrowdFunding.deployed();
  });
  it("should start a campaign properly", async () => {
    await crowdFunding.startCampaign(
      "To start a new company",
      1,
      "70000000000000000001",
      { from: address[9] }
    );
    const firstCampaign = await crowdFunding.campaigns(0);
    assert.equal(firstCampaign.id.toString(), "0");
  });

  it("should fund the campaign correctly", async () => {
    await crowdFunding.fund(0, {
      value: "10000000000000000000",
      from: address[1],
    });
    await crowdFunding.fund(0, {
      value: "10000000000000000000",
      from: address[2],
    });
    const firstCampaign = await crowdFunding.campaigns(0);
    const donationFromAddress1 = await crowdFunding.donationsPerCampaign(
      0,
      address[1]
    );
    assert.equal(donationFromAddress1.toString(), "10000000000000000000");
    assert.equal(
      firstCampaign.donationRaised.toString(),
      "20000000000000000000"
    );
  });
  // it("should not refund until the campaign is over", async () => {
  //   await crowdFunding.refund(0);
  //   // await crowdFunding.releaseFundsForCampaign(0);
  //   const firstCampaign = await crowdFunding.campaigns(0);
  //   assert.equal(
  //     firstCampaign.donationRaised.toString(),
  //     "20000000000000000000"
  //   );
  // const totalDonations = await crowdFunding.getTotalDonation();
  // console.log(totalDonations.toString());
  // });
  // it("should subtract the refunded amount properly", async () => {
  //   const donationBy1add = await crowdFunding.donationsList(address[1]);
  //   const donationBy2add = await crowdFunding.donationsList(address[2]);
  //   const donationOnThisCampaignByAdd1 =
  //     await crowdFunding.donationsPerCampaign(1, address[1]);
  //   assert.equal(donationBy1add.toString(), "0");
  //   assert.equal(donationBy2add.toString(), "0");
  //   assert.equal(
  //     donationOnThisCampaignByAdd1.toString(),
  //     "0"
  //   );
  // });
  it("should count the votes properly", async () => {
    await crowdFunding.fund(0, {
      value: "1000000000000000",
      from: address[3],
    });
    await crowdFunding.fund(0, {
      value: "1000000000000000",
      from: address[4],
    });
    await crowdFunding.voteFavour(0, {
      from: address[1],
    });
    await crowdFunding.voteFavour(0, {
      from: address[2],
    });
    await crowdFunding.voteNotFavour(0, {
      from: address[3],
    });
    await crowdFunding.voteFavour(0, {
      from: address[4],
    });
    const result = await crowdFunding.checkWinnerAfterVoting(0);
    const campaign = await crowdFunding.campaigns(0);
    const totalDoners = await crowdFunding.totalDonars();
    console.log("votesInFavour", campaign.votesInFavor.toString());
    console.log("votesInNotFavour", campaign.votesNotInFavor.toString());
    console.log("res", result.toString());
    console.log("Total", totalDoners.toString());
  });
});
