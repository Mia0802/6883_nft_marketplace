// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ERC721connector.sol';
import "hardhat/console.sol";

contract PixleU is ERC721Connector{

    string [] public pixleUz;
    address public owner = msg.sender;

    mapping(string => bool) _pixleUzExists;

    function mint(string memory _pixleU) public {

        require(!_pixleUzExists[_pixleU], 'Error: pixleU already exists');

        pixleUz.push(_pixleU);
        uint _id = pixleUz.length - 1;
        _mint(msg.sender, _id);

        console.log(owner);
        console.log(msg.sender);

        _pixleUzExists[_pixleU] = true;

    }
}
