import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.22",
  networks: {
    optimism: {
      url: "https://optimism-mainnet.infura.io/v3/3023c3aab2c541cb8be914ffd6af0009",
      accounts: ["0x" + process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/abb2c4a3c2f64d2e96f26e54ccb5e8c3",
      accounts: ["0x" + process.env.PRIVATE_KEY],
    },
  },

};

export default config;
