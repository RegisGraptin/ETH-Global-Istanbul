# SafetyFirst - ETH-Global-Istanbul

SafetyFirst is a groundbreaking decentralized application (Dapp) designed to address the urgent needs arising from natural disasters such as earthquakes and tsunamis. Our platform is committed to providing swift financial assistance to victims in times of crisis, aiming to make a meaningful impact on their road to recovery.

We introduced a donation process by introducing a user-friendly monthly subscription system on web3 platform. Users have the flexibility to set their monthly contribution amounts, ensuring a hassle-free and consistent approach to supporting disaster relief efforts. Subscription cancellation is made easy, empowering users with control over their contributions.

Finally, SafetyFirst goes beyond financial aid; we've implemented an innovative alerting system for real-time communication during disasters. Victims can use the platform to notify the community about their need for assistance. Individuals willing to help can also use the system to offer their support to those affected, fostering a sense of community-driven aid.


## SafetyFirst Smart Contract

USDC test token (free mint, verified)
https://mumbai.polygonscan.com/address/0x25d6043b08892cC5f96A44f423Ac614379DBf27f

SafetyFirst test contract v.1 (verified)
https://mumbai.polygonscan.com/address/0xd804562F11140d330456A68665BD6e0e19636e48

## The Graph
Build completed: QmXj9NxAqePuGADcC2XynbCedibwGrkwDBbnnG95E9wZUT

Deployed to https://thegraph.com/studio/subgraph/safetyfirst

Subgraph endpoints:
Queries (HTTP): https://api.studio.thegraph.com/query/54169/safetyfirst/v.0.0.1

Query name: DisastersList
Query:
{
  disasterRegistereds(orderBy: disasterId, orderDirection: desc) {
    disasterId
    disaster_category
    disaster_location
    disaster_evidence
  }
}

## Monthly subscription system 

Donations are crucial to help support causes and make a positive impact on the world. However, it is sometimes painful to do a transaction each month to send money. We have created a system allowing users to give to charity on a monthly basis automatically. Now, a user just have to specify the cause he want to donate (Smart Contract address) and the amount of money he wants to give each month to the cause. He can then provide money to the smart contract in one transaction, and have the option of stopping his subscription latter on. This functionality allow him to abstract those transaction as it can be executed by other actors. Indeed, in our implementation, we decided to use Chainlink automation to trigger each month the smart contract function for transferring the fund from the smart contract to his support cause.

Smart Contract deployed: `./front/packages/hardhat/contracts/SubscriptionWallet.sol`
> Deployed Address: `0x614dBedcC186C48B080582349BFDdBcf5c552a26`

Chainlink Upkeep ID: `84420421238104438344157666514217813826547256944855569444703227161725687943734`
Chainlink Upkeep address: `0x8B7D44941025FFfd53a054405B96A6b256efA329`

More Information:
> https://automation.chain.link/mumbai/84420421238104438344157666514217813826547256944855569444703227161725687943734

