// contexts
import { useAuth } from "../../contexts/useAuth";
import { useBiconomy } from "../../contexts/useBiconomy";

// utils
import { ethers, ContractInterface } from "ethers";
import { getSignatureParametersEthers } from "../../utils";

// constants
import { NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712 } from "../../utils/constants";

// abis
import NftMarketplace from "../../contracts/abis/NftMarketplace.json";

// types
import { INft } from "../../utils/types";

const useHandleListItem = () => {
  const { user } = useAuth();
  const { biconomy } = useBiconomy();

  const { id: userAddress } = user;

  const handleListItemTest = async (nft: INft) => {
    const {
      id: { tokenId },
      contract: { address: NftContractAddress },
    } = nft;

    console.log("Sending meta transaction");
    // const web3 = new Web3(window.ethereum as any);
    const ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
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
      name: "NftMarketplace",
      version: "1",
      verifyingContract: NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
      salt: "0x" + (80001).toString(16).padStart(64, "0"),
    };
    const signer = await ethersProvider.getSigner(userAddress);

    const contractInstance = new ethers.Contract(
      NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
      NftMarketplace.abi as ContractInterface,
      signer!
    );
    console.log({ NftContractAddress, tokenId });
    let nonce = await contractInstance.getNonce(userAddress);
    const contractInterface = new ethers.utils.Interface(NftMarketplace.abi);
    let functionSignature = contractInterface.encodeFunctionData("listItem", [
      NftContractAddress,
      tokenId,
      ethers.utils.parseEther("0.1"),
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

    // Its important to use eth_signTypedData_v3 and not v4 to get EIP712 signature because we have used salt in domain data
    // instead of chainId
    let signature = await ethersProvider.send("eth_signTypedData_v3", [
      userAddress,
      dataToSign,
    ]);
    let { r, s, v } = getSignatureParametersEthers(signature);
    sendSignedTransaction(userAddress!, functionSignature, r, s, v);
  };

  const handleListItem = async (nft: INft) => {
    if (!biconomy) {
      console.log("biconomy is not initialized");
      return;
    }
    const {
      id: { tokenId },
      contract: { address: NftContractAddress },
    } = nft;
    // const price = 2;

    const ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );

    const signer = await ethersProvider.getSigner(userAddress);

    console.log({ signer });

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
      name: "NftMarketplace",
      version: "1",
      verifyingContract: NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
      salt: "0x" + (80001).toString(16).padStart(64, "0"),
    };

    const contractInstance = new ethers.Contract(
      NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
      NftMarketplace.abi as ContractInterface,
      signer!
    );

    let nonce = await contractInstance.getNonce(userAddress);
    const contractInterface = new ethers.utils.Interface(NftMarketplace.abi);
    // const functionSignature = contractInterface.encodeFunctionData("listItem", [
    //   ethers.utils.getAddress(NftContractAddress),
    //   tokenId,
    //   price,
    // ]);
    let functionSignature = contractInterface.encodeFunctionData("listItem", [
      NftContractAddress,
      tokenId,
      ethers.utils.parseEther("0.1"),
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
    sendSignedTransaction(userAddress!, functionSignature, r, s, v);
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
      if (!biconomy) {
        console.log("BINOCONMY IS NOT INITIALIZED");
        return;
      }
      const provider = await biconomy.provider;
      console.log({ provider });
      const contractInstance = new ethers.Contract(
        NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
        NftMarketplace.abi,
        biconomy.ethersProvider
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
        to: NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
        from: userAddress,
        signatureType: "EIP712_SIGN",
      };
      // @ts-ignore
      const tx = await provider.send("eth_sendTransaction", [txParams]);
      console.log(tx);
      biconomy.on("txHashGenerated", (data: any) => {
        console.log("txHashGenerated", data);
        console.log(data);
      });
      biconomy.on("txMined", (data: any) => {
        console.log("txMined", data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const sendSignedTransaction = async (
  //   userAddress: string,
  //   functionData: string,
  //   r: string,
  //   s: string,
  //   v: number
  // ) => {
  //   try {
  //     const provider = await biconomy?.provider;
  //     console.log({ provider });
  //     const contractInstance = new ethers.Contract(
  //       NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
  //       NftMarketplace.abi,
  //       biconomy?.ethersProvider
  //     );
  //     let { data } =
  //       await contractInstance.populateTransaction.executeMetaTransaction(
  //         userAddress,
  //         functionData,
  //         r,
  //         s,
  //         v
  //       );
  //     let txParams = {
  //       data: data,
  //       to: NFT_MARKETPLACE_CONTRACT_ADDRESS_EIP_712,
  //       from: userAddress,
  //       signatureType: "EIP712_SIGN",
  //     };

  //     console.log({ txParams });

  //     // @ts-ignore
  //     const tx = await provider.send("eth_sendTransaction", [txParams]);
  //     console.log({ tx });
  //     biconomy?.on("txHashGenerated", (data: any) => {
  //       console.log("txHashGenerated: ", data);
  //     });
  //     biconomy?.on("txMined", (data: any) => {
  //       console.log("txMined: ", data);
  //     });
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  return {
    handleListItem: handleListItemTest,
  };
};

export default useHandleListItem;
