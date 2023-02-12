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

  const handleListItem = async (nft: INft) => {
    const {
      id: { tokenId },
      contract: { address: NftContractAddress },
    } = nft;
    const price = 2;
    const userAddress = address;

    const ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );

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
      ethers.utils.getAddress(NftContractAddress),
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
    sendSignedTransaction(address!, functionSignature, r, s, v);
    console.log({ r, s, v });
  };

  const sendSignedTransaction = async (
    userAddress: string,
    functionData: string,
    r: string,
    s: string,
    v: number
  ) => {
    try {
      const provider = await biconomy?.provider;
      const contractInstance = new ethers.Contract(
        NFT_MARKETPLACE_CONTRACT_ADDRESS,
        NftMarketplace.abi,
        biconomy?.ethersProvider
      );
      let { data } =
        await contractInstance.populateTransaction.executeMetaTransaction(
          userAddress,
          functionData,
          r,
          s,
          v
        );
      let txParams = {
        data: data,
        to: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        from: userAddress,
        signatureType: "EIP712_SIGN",
      };

      console.log({ txParams });

      // @ts-ignore
      const tx = await provider.send("eth_sendTransaction", [txParams]);
      console.log(tx);
      biconomy?.on("txHashGenerated", (data: any) => {
        console.log(data);
      });
      biconomy?.on("txMined", (data: any) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleListItem,
  };
};

export default useHandleListItem;
