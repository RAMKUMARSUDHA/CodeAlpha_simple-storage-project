const hre = require("hardhat");

async function main() {

    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

    const simpleStorage = await hre.ethers.getContractAt(
        "SimpleStorage",
        contractAddress
    );

    console.log("Initial Value:", (await simpleStorage.value()).toString());

    const tx1 = await simpleStorage.increment();
    await tx1.wait();

    console.log(
        "After Increment:",
        (await simpleStorage.value()).toString()
    );

    const tx2 = await simpleStorage.increment();
    await tx2.wait();

    console.log(
        "After Second Increment:",
        (await simpleStorage.value()).toString()
    );

    const tx3 = await simpleStorage.decrement();
    await tx3.wait();

    console.log(
        "After Decrement:",
        (await simpleStorage.value()).toString()
    );

    console.log(
        "getValue():",
        (await simpleStorage.getValue()).toString()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});