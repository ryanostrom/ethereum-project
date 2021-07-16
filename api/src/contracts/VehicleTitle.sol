// SPDX-License-Identifier: License TBD
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

contract VehicleTitle {
    address public owner;
    address public nextOwner;

    struct Vehicle {
      string vin;
      string make;
      string model;
      string year;
      string trim;
      string color;
    }
    Vehicle public vehicle;

    constructor(address initialOwner, string memory vin, string memory make, string memory model, string memory year, string memory trim, string memory color) {
        owner = initialOwner;
        vehicle = Vehicle(vin,make,model,year,trim,color);
    }

    function setNextOwner(address initialNextOwner) public ownerRestricted {
        nextOwner = initialNextOwner;
    }

    function setPayment() public nextOwnerRestricted {
        owner = nextOwner;
        nextOwner = msg.sender;
    }

    modifier ownerRestricted() {
        require(msg.sender == owner);
        _;
    }

    modifier nextOwnerRestricted() {
        require(msg.sender == nextOwner);
        _;
    }
}
