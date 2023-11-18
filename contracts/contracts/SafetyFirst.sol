// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

/**
 * @title SafetyFirst Contract
 * @notice This contract implements disaster tracking and compensation handling using Chainlink and World ID.
 * @dev The contract uses Chainlink for external data fetching and World ID for unique identity verification.
 */
contract SafetyFirst is ChainlinkClient, ConfirmedOwner {
    using SafeERC20 for IERC20;
    using ByteHasher for bytes;
    using Chainlink for Chainlink.Request;

    uint256 public amount = 1 ether; // compensations
    IERC20 private token;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;
    string private appId;
    uint256 internal immutable groupId = 1;

    mapping(uint256 => bool) internal nullifierHashes;

    struct Disaster {
        string category; // flood, earthquake, etc
        string location; // landmark, city, etc
        string evidence; // url to evidence
    }

    // id => status
    mapping(string => bool) public occurrences;

    // id => disaster
    mapping(string => Disaster) public disasters;

    bytes32 private jobId;
    uint256 private fee;

    event RequestFirstId(bytes32 indexed requestId, string id);

    event DisasterRegistered(string indexed disasterId, bool status, Disaster disaster);
    event DisasterUpdated(string indexed disasterId, Disaster disaster);

    event Claimed(address victim, uint amount);
    event OccurrenceChanged(string indexed disasterId, bool occurrence);
    event TokenChanged(address newToken);

    /**
     * @notice Constructor for SafetyFirst contract.
     * @param _worldId The WorldID instance that will verify the proofs.
     * @param _appId The World ID app ID.
     * @param _token The ERC20 token address used for compensations.
     */
    constructor(
        IWorldID _worldId,
        string memory _appId,
        address _token
    ) ConfirmedOwner(msg.sender) {
        worldId = _worldId;
        appId = _appId;
        token = IERC20(_token);
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    /**
     * @notice Sends a request to Chainlink to fetch data for a potential disaster event.
     * @dev Only callable by the contract owner.
     * @param url The URL to fetch data from.
     */
    function requestDisaster(string calldata url) external onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add("get", url);

        req.add("path", "data,0,id");
        // Sends the request
        sendChainlinkRequest(req, fee);
    }

    /**
     * @notice Callback function for Chainlink to fulfill data requests.
     * @dev This function can only be called by Chainlink in response to `requestDisaster`.
     * @param requestId The ID of the Chainlink request being fulfilled.
     * @param id The disaster ID obtained from the Chainlink response.
     */
    function fulfill(
        bytes32 requestId,
        string memory id
    ) public recordChainlinkFulfillment(requestId) {
       registerDisaster(true, id, "tba", "tba", "tba");
       emit RequestFirstId(requestId, id);
    }

    /**
     * @notice Allows the owner to withdraw LINK tokens from the contract.
     * @dev Only callable by the contract owner.
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    /**
     * @notice Registers a disaster event internally in the contract.
     * @dev Internal function, can be called from other functions within the contract.
     * @param _occurrence Indicates whether the disaster is currently occurring.
     * @param _disasterId Unique identifier for the disaster.
     * @param _category Type of the disaster (e.g., earthquake, flood).
     * @param _location Location of the disaster.
     * @param _evidence URL to evidence supporting the disaster occurrence.
     */
    function registerDisaster(
        bool _occurrence,
        string memory _disasterId,
        string memory _category,
        string memory _location,
        string memory _evidence
    ) internal {
        require(bytes(disasters[_disasterId].category).length == 0, "Disaster already registered");
        occurrences[_disasterId] = _occurrence;

        disasters[_disasterId] = Disaster({
            category: _category,
            location: _location,
            evidence: _evidence
        });

        emit DisasterRegistered(
            _disasterId,
            _occurrence,
            disasters[_disasterId]
        );
    }

    /**
     * @notice Allows the owner to register a disaster event.
     * @dev Only callable by the contract owner. Registers a new disaster event.
     * @param _occurrence Indicates whether the disaster is currently occurring.
     * @param _disasterId Unique identifier for the disaster.
     * @param _category Type of the disaster (e.g., earthquake, flood).
     * @param _location Location of the disaster.
     * @param _evidence URL to evidence supporting the disaster occurrence.
     */
    function registerDisasterOwner(
        bool _occurrence,
        string calldata _disasterId,
        string calldata _category,
        string calldata _location,
        string calldata _evidence
    ) public onlyOwner {
        occurrences[_disasterId] = _occurrence;

        require(bytes(disasters[_disasterId].category).length == 0, "Disaster already registered");

        disasters[_disasterId] = Disaster({
            category: _category,
            location: _location,
            evidence: _evidence
        });

        emit DisasterRegistered(
            _disasterId,
            _occurrence,
            disasters[_disasterId]
        );
    }

    /**
     * @notice Updates the details of an already registered disaster.
     * @dev Only callable by the contract owner. Updates an existing disaster event.
     * @param _disasterId Unique identifier for the disaster.
     * @param _category Type of the disaster (e.g., earthquake, flood).
     * @param _location Location of the disaster.
     * @param _evidence URL to evidence supporting the disaster occurrence.
     */
    function updateDisaster(
        string calldata _disasterId,
        string calldata _category,
        string calldata _location,
        string calldata _evidence
    ) public onlyOwner {
        require(bytes(disasters[_disasterId].category).length > 0, "Disaster not registered");

        disasters[_disasterId] = Disaster({
            category: _category,
            location: _location,
            evidence: _evidence
        });

        emit DisasterUpdated(
            _disasterId,
            disasters[_disasterId]
        );

    }

    /**
     * @notice Verifies a user's claim using World ID and executes the claim if valid.
     * @dev This function verifies proof of uniqueness and handles token transfers.
     * @param signal An arbitrary input from the user, usually the user's wallet address.
     * @param root The root of the Merkle tree used in the proof.
     * @param nullifierHash The nullifier hash for this proof, preventing double signaling.
     * @param proof The zero-knowledge proof of identity.
     * @param _actionId The action ID related to the disaster event.
     */
    function verifyAndExecute(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        string memory _actionId
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        require(bytes(disasters[_actionId].category).length > 0, "Disaster not registered");

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

        // transfer tokens to user
        token.safeTransfer(signal, amount);
        emit Claimed(signal, amount);
    }

    /**
     * @notice Changes the occurrence status of a registered disaster.
     * @dev Only callable by the contract owner. Updates the occurrence status of a disaster.
     * @param _disasterId Unique identifier for the disaster.
     * @param _occurrence The new occurrence status of the disaster.
     */
    function changeOccurrence(
        string calldata _disasterId,
        bool _occurrence
    ) public onlyOwner {
        occurrences[_disasterId] = _occurrence;

        emit OccurrenceChanged(_disasterId, _occurrence);
    }

    /**
     * @notice Changes the ERC20 token used for compensations.
     * @dev Only callable by the contract owner. Changes the token address.
     * @param _token The new ERC20 token address.
     */
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
