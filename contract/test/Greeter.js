// import { waffle } from 'ethereum-waffle';

const { expect } = require("chai");
const { ethers } = require("hardhat");
// const provider = waffle.provider;

describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello World!");
        await greeter.deployed()

        expect(await greeter.greet()).to.equal("Hello World!");

        const setGreetingTx = await greeter.setGreeting("Hola Mundo!");

        await setGreetingTx.wait();

        expect(await greeter.greet()).to.equal("Hola Mundo!"); 
    })

    // it("Should return the new balance after ether is deposited", async function () {
    //     const Greeter = await ethers.getContractFactory("Greeter");
    //     const greeter = await Greeter.deploy("Hello World!");
    //     await greeter.deployed()

    //     await greeter.deposit({value: 10})
    //     expect(await provider.getBalance(greeter.address)).to.equal(10)
    // })

})