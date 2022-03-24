import hre from "hardhat";
import { getENV, getNonce } from "../utils/network";

/**
npx hardhat --network rinkeby run scripts/deployWLSeller.ts
 */
async function main() {
    const ethers = hre.ethers;
    const utils = ethers.utils;
    const [owner] = await ethers.getSigners();
    
    const sosAddress = getENV(hre, "sos");
    const treasureAddress = getENV(hre, "treasure");

    const OpenDAOWLSellerFactory = await ethers.getContractFactory("OpenDAOWLSeller");
    const OpenDAOWLSeller = await OpenDAOWLSellerFactory.connect(owner).deploy(sosAddress, treasureAddress, {
        maxFeePerGas: utils.parseUnits("120", "gwei"),
        maxPriorityFeePerGas: utils.parseUnits("1.18", "gwei"),
        gasLimit: 3519404,
    });

    console.log("OpenDAOWLSeller contract address:", OpenDAOWLSeller.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
