# ETH-Global-Istanbul

##Smart Contracts
USDC test token (free mint, verified)
https://mumbai.polygonscan.com/address/0x25d6043b08892cC5f96A44f423Ac614379DBf27f

SafetyFirst test contract v.1 (not verified)
https://mumbai.polygonscan.com/address/0xd804562F11140d330456A68665BD6e0e19636e48

##The Graph
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