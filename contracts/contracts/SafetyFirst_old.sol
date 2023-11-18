// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract SafetyFirst is FunctionsClient, ConfirmedOwner {
    using SafeERC20 for IERC20;
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    
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

    address router = 0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C;

    string source =
        "const apiResponse = await Functions.makeHttpRequest({"
         "url: `https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeBuffer(data);";

    uint32 gasLimit = 300000;

    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;

    event DisasterRegistered(uint256 disasterId, bool occurrence, Disaster disaster);
    event Claimed(address victim, uint amount);
    event OccurrenceChanged(uint disasterId, bool occurrence);
    event TokenChanged(address newToken);
    event Response(bytes32 indexed requestId, string jsonData, bytes response, bytes err);

    constructor(address initialOwner, address _token) FunctionsClient(router) ConfirmedOwner(msg.sender) {
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
        jsonData = string(response);
        s_lastError = err;

        registerDisaster(jsonData.occurrence, jsonData.category, jsonData.location, jsonData.evidence);

        // Emit an event to log the response
        emit Response(requestId, jsonData, s_lastResponse, s_lastError);
    }

    function registerDisaster(
            bool _occurrence,
            string calldata _category, 
            string calldata _location, 
            string calldata _evidence
        ) internal {

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