// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Co2Consumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;
    uint256 public lastEmission;
        
    event RequestCo2Emission(uint256 indexed time);
    event FullFilled(uint256 indexed time, uint256 co2);
    

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB); // insertar Chainlink Token de la chain correcta       
        setChainlinkOracle(0xD00B41d72b9d6d61dAdcF37279A823e2eCeEF8e2); // insertar Chainlink oracle desplegado y habilitar al nodo
        jobId = "4d9dd08f95294919b96fa0ac4a5bc624"; // insertar el jobID Correcto
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function requestCo2Emission(        
        string memory _from,
        string memory _to,
        uint256 _passengers,
        string memory _classFlight
    ) external returns (bytes32 requestId) {
        require(_passengers <= 555, "Max num of passengers is 555");
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        // Convierte el numero entero en un string
        string memory _strPassengers = Strings.toString(_passengers);

        req.add("from", _from);
        req.add("to", _to);
        req.add("passengers", _strPassengers);
        req.add("classFlight", _classFlight);
        
        emit RequestCo2Emission(block.timestamp);
        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _co2e)
        public
        recordChainlinkFulfillment(_requestId)
    {      
        lastEmission = _co2e;
        emit FullFilled(block.timestamp, _co2e);
    }


    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}