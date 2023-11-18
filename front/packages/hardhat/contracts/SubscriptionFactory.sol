//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./SubscriptionWallet.sol";

contract SubscriptionFactory {
    event CreatedContract(address);

    function createEvent(uint256 amount, address charity_address) public {
        address subscription = address(new SubscriptionWallet(amount, charity_address));
        emit CreatedContract(subscription);
        // return subscription;
    }

}