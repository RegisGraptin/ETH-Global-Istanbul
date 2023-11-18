// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SafetyFirst is Ownable {
    using SafeERC20 for IERC20;
    
    uint256 public amount = 1 ether; // compensations
    uint256 public disasterId = 0;
    IERC20 private token;

    struct Disaster {
		string category;
		string location;
        string evidence;
    }

    // id => status
    mapping (uint256 => bool) public occurrences;

    // id => disaster
    mapping (uint256 => Disaster) public disasters;

    event DisasterRegistered(uint256 disasterId, bool status, Disaster disaster);
    event Claimed(address victim, uint amount);
    event OccurrenceChanged(uint disasterId, bool occurrence);
    event TokenChanged(address newToken);

    constructor(address initialOwner, address _token) Ownable(initialOwner) {
        token = IERC20(_token);
    }

    function registerDisaster(
            bool _occurrence,
            string calldata _category, 
            string calldata _location, 
            string calldata _evidence
        ) public onlyOwner {

        disasterId++;

        occurrences[disasterId] = _occurrence;

        disasters[disasterId] = Disaster({
			category: _category, 
			location: _location, 
			evidence: _evidence 
		});

		emit DisasterRegistered(disasterId, _occurrence, disasters[disasterId]);
    }

    function claim(address _victim) public {
        // require
        // approve
        token.safeTransfer(_victim, amount);

        emit Claimed(_victim, amount);
    }

    function changeOccurrence(uint256 _disasterId, bool _occurrence) public onlyOwner {
        occurrences[_disasterId] = _occurrence;

        emit OccurrenceChanged(_disasterId, _occurrence);
    }

    function changeToken(address _token) public onlyOwner {
        token = IERC20(_token);

        emit TokenChanged(_token);
    }

    receive() external payable {
        revert();
    }

    fallback() external payable {
        revert();
    }
}