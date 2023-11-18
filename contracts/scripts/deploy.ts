import hre from "hardhat";

async function main() {

  const sf = await hre.viem.deployContract("SafetyFirst", ["0x57f928158C3EE7CDad1e4D8642503c4D0201f611","app_ca49010ff2c9b0c665b5c9c7f1b4e303","0x299e82279A5F30F9D8b747Bc41a7EEb405a72Dd8"]);

  console.log(
    `SafetyFirst deployed to ${sf.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
