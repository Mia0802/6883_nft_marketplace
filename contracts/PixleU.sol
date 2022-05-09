import "hardhat/console.sol";
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ERC721connector.sol';

contract PixleU is ERC721Connector{

    string [] public pixleUz;

    mapping(string => bool) _pixleUzExists;

    function mint(string memory _pixleU) public {

        require(!_pixleUzExists[_pixleU], 'Error: pixleU already exists');

        pixleUz.push(_pixleU);
        uint _id = pixleUz.length - 1;

        _mint(msg.sender, _id);

        _pixleUzExists[_pixleU] = true;

    }

    constructor() ERC721Connector(){}
}
