// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ticket.sol";

contract TicketFactory {
    Ticket[] public TicketArray;

    address _proxyRegistryAddress;

    constructor(address proxyRegistryAddress) {
        _proxyRegistryAddress = proxyRegistryAddress;
    }

    function CreateTicket(string memory _baseUri, uint256 _supply, uint256 _value, string  memory name, string memory ticker) public {
        Ticket ticket = new Ticket(_baseUri, _supply, _value, name, ticker, _proxyRegistryAddress);
        TicketArray.push(ticket);
    }
}
