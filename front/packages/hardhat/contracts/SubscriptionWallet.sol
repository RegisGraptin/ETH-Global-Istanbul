//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionWallet is Ownable {

    event MonthlyTransfer(uint indexed month, uint amount, address indexed recipient);

    uint256 public monthly_amount;
    uint256 public last_payment;
    address public target_charity;
    
    constructor(
        uint256 _monthly_amount,
        address _target_charity
    ) {
        monthly_amount = _monthly_amount;
        target_charity = _target_charity;
        last_payment = 0;
    }


    function monthlySubscription() public {
        require(
            block.timestamp > last_payment + 30 days,
            "MonthlySubscription: Transfer allowed once per month"
        );

        // Send the fund to the smart contract DAO 
        payable(target_charity).transfer(monthly_amount);

        // Update the last payment date
        last_payment = block.timestamp;

        // Emit an event
        emit MonthlyTransfer(block.timestamp / 30 days, monthly_amount, target_charity);
    }

    function send() public payable {}

}