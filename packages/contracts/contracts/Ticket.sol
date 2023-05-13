// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721Tradable.sol";

/**
 * @title Ticket
 */
contract Ticket is ERC721Tradable {
    using Counters for Counters.Counter;
    Counters.Counter  public tokenIdCounter;

    string baseURI;
    uint256 value;
    uint256 supply;

    constructor(string memory _baseUri, uint256 _supply, uint256 _value, string  memory name, string memory ticker, address _proxyRegistryAddress)
        ERC721Tradable(name, ticker, _proxyRegistryAddress)
    {
        baseURI = _baseUri;
        supply = _supply;
        value = _value;
    }

    function baseTokenURI() override public view returns (string memory) {
        return baseURI;
    }

    function exists(uint256 tokenId) public view virtual returns (bool) {
        return _exists(tokenId);
    }

    function mint() public payable returns (uint256) {
        require(msg.value >= value, "Not enough amount sent");
        require(!soldOut(), "ticket sold out");
        tokenIdCounter.increment();
        mintTo(msg.sender, tokenIdCounter.current());
        return tokenIdCounter.current();
    }

    function soldOut() public view virtual returns (bool) {
        return tokenIdCounter.current() == value;
    }

    function getValue() public view virtual returns (uint256) {
        return value;
    }
    function getSupply() public view virtual returns (uint256) {
        return supply;
    }
}
