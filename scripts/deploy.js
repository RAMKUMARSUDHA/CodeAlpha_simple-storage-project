const hre = require("hardhat");

async function main() {
    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");

    const simpleStorage = await SimpleStorage.deploy();

    await simpleStorage.waitForDeployment();

    console.log(
        "Contract deployed to:",
        await simpleStorage.getAddress()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});