// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import 'contracts/interfaces/IERC721enumerable.sol';

contract ERC721Enumerable is IERC721Enumerable, ERC721 {

    uint256[] private _allTokens;

        mapping(uint256 => uint256) private _allTokensIndex;
        mapping(address => uint256[]) private _ownedTokens;
        mapping(uint256 => uint256) private _ownedTokensIndex;

    
    constructor() {
        _registerInterface(bytes4(keccak256('totalSupply(bytes4)')^
        keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));
    }

    function totalSupply() public override view returns(uint256) {
        return _allTokens.length;
    }

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);

        _addTokensToAllTokenEnumeration(tokenId); 
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId); 
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);   
    }

    function tokenByIndex(uint256 index) public override view returns(uint256) {
        require(index < totalSupply(), 'Global index out of bounds!');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint index) public override view returns(uint256) {
        require(index < balanceOf(owner),'Owner index out of bounds!');
        return _ownedTokens[owner][index];  
    }

}