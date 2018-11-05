var Migrations = artifacts.require("./Refund.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
