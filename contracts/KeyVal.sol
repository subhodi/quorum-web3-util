pragma solidity ^0.4.18;
contract KeyVal {
    mapping(address => bytes32) private map;

    function set(address _key, bytes32 _value) {
        map[_key]= _value;
    }

    function get(address _key) constant returns(bytes32) {
        return map[_key];
    }
}