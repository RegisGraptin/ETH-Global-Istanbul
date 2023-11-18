// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

contract SafetyFirst is FunctionsClient, ConfirmedOwner {
    using SafeERC20 for IERC20;
    using ByteHasher for bytes;
    using FunctionsRequest for FunctionsRequest.Request;

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
        string category;
        string location;
        string evidence;
    }

    // id => status
    mapping(string => bool) public occurrences;

    // id => disaster
    mapping(string => Disaster) public disasters;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    address router = 0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C;

    string source =
        "const apiResponse = await Functions.makeHttpRequest({"
         "url: `https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        // new list
        "return Functions.encodeBuffer(data);";

    uint32 gasLimit = 300000;

    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;

    event DisasterRegistered(
        string disasterId,
        bool status,
        Disaster disaster
    );
    event Claimed(address victim, uint amount);
    event OccurrenceChanged(string calldata disasterId, bool occurrence);
    event TokenChanged(address newToken);
    event Response(bytes32 indexed requestId, string jsonData, bytes response, bytes err);

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    constructor(
        IWorldID _worldId,
        string memory _appId,
        address initialOwner,
        address _token
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        worldId = _worldId;
        appId = _appId;
        token = IERC20(_token);
    }

     function sendRequest(
        uint64 subscriptionId,
        string[] calldata args
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        // param
        jsonData = string(response);
        s_lastError = err;

        registerDisaster(jsonData.occurrence, disasterId, jsonData.category, jsonData.location, jsonData.evidence);

        // Emit an event to log the response
        emit Response(requestId, jsonData, s_lastResponse, s_lastError);
    }

    function registerDisaster(
        bool _occurrence,
        string calldata _disasterId,
        string calldata _category,
        string calldata _location,
        string calldata _evidence
    ) internal {

        occurrences[_disasterId] = _occurrence;

        disasters[_disasterId] = Disaster({
            category: _category,
            location: _location,
            evidence: _evidence
        });

        emit DisasterRegistered(_disasterId, _occurrence, disasters[disasterId]);
    }

    function registerDisasterOwner(
        bool _occurrence,
        string calldata _disasterId,
        string calldata _category,
        string calldata _location,
        string calldata _evidence
    ) public onlyOwner {

        occurrences[_disasterId] = _occurrence;

        disasters[_disasterId] = Disaster({
            category: _category,
            location: _location,
            evidence: _evidence
        });

        emit DisasterRegistered(_disasterId, _occurrence, disasters[disasterId]);
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

        // transfer tokens to user
        token.safeTransfer(signal, amount);
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
