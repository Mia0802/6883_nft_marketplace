// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC165.sol';
import 'contracts/interfaces/IERC721.sol';
import 'contracts/libraries/Counters.sol';

contract ERC721 is ERC165, IERC721{
    using SafeMath for uint256; 
    using Counters for Counters.Counter;

    // event Transfer(
    //     address indexed from,
    //     address indexed to,
    //     uint256 indexed tokenId
    // );

    // event Approval(
    //     address indexed owner,
    //     address indexed approved,
    //     uint256 indexed tokenId
    // );
   
    mapping(uint256 => address) private _tokenOwner; 

    mapping(address => Counters.Counter) private _OwnedTokensCount;

    mapping(uint256 => address) private _tokenApprovals; 



    constructor() {
        _registerInterface(bytes4(keccak256('balanceOf(bytes4)')^
        keccak256('ownerOf(bytes4)')^keccak256('transferFrom(bytes4)')));
    }

    function balanceOf(address _owner) public override view returns(uint256) {
        require(_owner != address(0), 'Error: Non-existing Owner');
        return _OwnedTokensCount[_owner].current();
    }

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT

    function ownerOf(uint256 _tokenId) public view override returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), 'Error: Non-existing Token');
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns(bool){
         address owner = _tokenOwner[tokenId];
         return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), 'ERC721: Minting to the zero address');
        require(!_exists(tokenId), 'ERC721: Token is already minted');

        _tokenOwner[tokenId] = to; 
        _OwnedTokensCount[to].increment();  
       
       /* x = x + 1
        r = x + y, abs r >= x
        if x = 4 and y = 3 then r = 7
       abs r >= x
        r = x - y, abs y <= x
        */  
        

        emit Transfer(address(0), to, tokenId);
    }

    /// Transfer ownership of an NFT 
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.

    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        require(_to != address(0), 'Error: Transfer to the zero address');
        require(ownerOf(_tokenId) == _from, 'Error: Trying to transfer a token not owned');

        _OwnedTokensCount[_from].decrement();
        _OwnedTokensCount[_to].increment();

        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);

    }

    function isApprovedOrOwner(address spender, uint256 tokenId) internal view returns(bool) {
        require(_exists(tokenId), 'Error: Token does not exist');
        address owner = ownerOf(tokenId);
        return(spender == owner); 
    }

}