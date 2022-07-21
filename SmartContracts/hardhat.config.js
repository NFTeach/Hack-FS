require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    // matic: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [""],
    // },
  },
  solidity: "0.8.4",
};
