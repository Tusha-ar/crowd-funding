const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = function (deployer) {
  deployer.deploy(CrowdFunding, "100000000000");
};
