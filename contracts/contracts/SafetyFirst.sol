// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

contract SafetyFirst is Ownable {
    using SafeERC20 for IERC20;
    using ByteHasher for bytes;

    uint256 public amount = 1 ether; // compensations
    uint256 public disasterId = 0;
    IERC20 private token;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;
    string private appId;
    uint256 internal immutable groupId = 1;

    mapping(uint256 => bool) internal nullifierHashes;

    struct Disaster {
        string category;
        string location;
        string evidence;
    }

    // id => status
    mapping(uint256 => bool) public occurrences;

    // id => disaster
    mapping(uint256 => Disaster) public disasters;

    event DisasterRegistered(
        uint256 disasterId,
        bool status,
        Disaster disaster
    );
    event Claimed(address victim, uint amount);
    event OccurrenceChanged(uint disasterId, bool occurrence);
    event TokenChanged(address newToken);

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    constructor(
        IWorldID _worldId,
        string memory _appId,
        address initialOwner,
        address _token
    ) Ownable(initialOwner) {
        worldId = _worldId;
        appId = _appId;
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

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @param _actionId The action ID that was used to generate the external nullifier hash
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verifyAndExecute(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        string memory _actionId
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        uint256 externalNullifier = abi
            .encodePacked(abi.encodePacked(appId).hashToField(), _actionId)
            .hashToField();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;
        emit Claimed(signal, amount);
    }

    function changeOccurrence(
        uint256 _disasterId,
        bool _occurrence
    ) public onlyOwner {
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
