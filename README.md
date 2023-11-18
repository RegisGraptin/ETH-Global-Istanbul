# ETH-Global-Istanbul

## SafetyFirst Smart Contract

USDC test token (free mint, verified)
https://mumbai.polygonscan.com/address/0x25d6043b08892cC5f96A44f423Ac614379DBf27f

SafetyFirst test contract v.1 (not verified) ⬇️
https://mumbai.polygonscan.com/address/0xd804562F11140d330456A68665BD6e0e19636e48



## Monthly subscription system 

Donations are crucial to help support causes and make a positive impact on the world. However, it is sometimes painful to do a transaction each month to send money. We have created a system allowing users to give to charity on a monthly basis automatically. Now, a user just have to specify the cause he want to donate (Smart Contract address) and the amount of money he wants to give each month to the cause. He can then provide money to the smart contract in one transaction, and have the option of stopping his subscription latter on. This functionality allow him to abstract those transaction as it can be executed by other actors. Indeed, in our implementation, we decided to use Chainlink automation to trigger each month the smart contract function for transferring the fund from the smart contract to his support cause.

Smart Contract deployed: `./front/packages/hardhat/contracts/SubscriptionWallet.sol`
> Deployed Address: `0x614dBedcC186C48B080582349BFDdBcf5c552a26`

Chainlink Upkeep ID: `84420421238104438344157666514217813826547256944855569444703227161725687943734`
Chainlink Upkeep address: `0x8B7D44941025FFfd53a054405B96A6b256efA329`

More Information:
> https://automation.chain.link/mumbai/84420421238104438344157666514217813826547256944855569444703227161725687943734

