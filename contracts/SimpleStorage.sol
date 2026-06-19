// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {

    uint256 public value = 0;

    event ValueChanged(
        uint256 indexed previousValue,
        uint256 indexed newValue,
        address indexed changedBy
    );

    function increment() public {
        uint256 previous = value;
        value += 1;
        emit ValueChanged(previous, value, msg.sender);
    }

    function decrement() public {
        require(value > 0, "Cannot decrement below zero");

        uint256 previous = value;
        value -= 1;

        emit ValueChanged(previous, value, msg.sender);
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}