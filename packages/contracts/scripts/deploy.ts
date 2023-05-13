import { ethers } from "hardhat";

async function main() {
  const TicketFactory = await ethers.getContractFactory("TicketFactory");
  // (string memory _baseUri, uint256 memory _supply, uint256 _value, string  memory name, string memory ticker, address _proxyRegistryAddress)
  const ticketF = await TicketFactory.deploy("0xff7Ca10aF37178BdD056628eF42fD7F799fAc77c");

  const r = await (await ticketF.deployed()).deployTransaction.wait();

  console.log(r);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
