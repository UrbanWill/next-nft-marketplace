// contexts
import { useAuth } from "../../contexts/useAuth";
import { useBiconomy } from "../../contexts/useBiconomy";

// utils
import { ethers, ContractInterface } from "ethers";
import { getSignatureParametersEthers } from "../../utils";

// constants
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "../../utils/constants";

// abis
import NftMarketplace from "../../contracts/abis/NftMarketplace.json";

// types
import { INft } from "../../utils/types";

const useHandleListItem = () => {
  const { user } = useAuth();
  const { biconomy } = useBiconomy();

  const { id: address } = user;

  console.log({ biconomy });

  const handleListItem = async (nft: INft) => {
    const {
      id: { tokenId },
      contract: { address: NftContractAddress },
    } = nft;
    const price = 0.05;
    console.log({ tokenId, address, price });
    const userAddress = address;

    const ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );

    // await ethersProvider.send("eth_requestAccounts", []);
    const signer = await ethersProvider.getSigner();

    const domainType = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
    ];
    const metaTransactionType = [
      { name: "nonce", type: "uint256" },
      { name: "from", type: "address" },
      { name: "functionSignature", type: "bytes" },
    ];
    let domainData = {
      name: "TestContract",
      version: "1",
      verifyingContract: NFT_MARKETPLACE_CONTRACT_ADDRESS,
      salt: "0x" + (42).toString(16).padStart(64, "0"),
    };

    const contractInstance = new ethers.Contract(
      NFT_MARKETPLACE_CONTRACT_ADDRESS,
      NftMarketplace.abi as ContractInterface,
      signer!
    );

    let nonce = await contractInstance.getNonce(userAddress);
    const contractInterface = new ethers.utils.Interface(NftMarketplace.abi);
    const functionSignature = contractInterface.encodeFunctionData("listItem", [
      NftContractAddress,
      tokenId,
      price,
    ]);

    let message = {
      nonce: parseInt(nonce),
      from: userAddress,
      functionSignature: functionSignature,
    };

    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType,
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message,
    });

    let signature = await ethersProvider.send("eth_signTypedData_v3", [
      userAddress,
      dataToSign,
    ]);

    let { r, s, v } = getSignatureParametersEthers(signature);
    // sendSignedTransaction(address!, functionSignature, r, s, v)
    console.log({ r, s, v });
  };

  return {
    handleListItem,
  };
};

export default useHandleListItem;
