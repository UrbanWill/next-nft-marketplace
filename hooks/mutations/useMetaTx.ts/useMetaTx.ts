// contexts
import { useAuth } from "../../../contexts/useAuth";
import { useBiconomy } from "../../../contexts/useBiconomy";

// utils
import { ethers, ContractInterface } from "ethers";
import { getSignatureParametersEthers } from "../../../utils/getSignatureParametersEthers";

// abis
import Custom_EIP712Sign_Biconomy from "../../../contracts/abis/Custom_EIP712Sign_Biconomy.json";

const config = Custom_EIP712Sign_Biconomy;

const useMetaTx = () => {
  const { user } = useAuth();
  const { biconomy } = useBiconomy();

  const { id: userAddress } = user;
  const handleListItem = async () => {
    console.log("Sending meta transaction");
    // const web3 = new Web3(window.ethereum as any);
    const ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    const signer = await ethersProvider.getSigner(userAddress);
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
      verifyingContract: config.contract.address,
      salt: "0x" + (80001).toString(16).padStart(64, "0"),
    };
    const contractInstance = new ethers.Contract(
      config.contract.address,
      config.contract.abi as ContractInterface,
      signer!
    );
    let nonce = await contractInstance.getNonce(userAddress);
    const contractInterface = new ethers.utils.Interface(config.contract.abi);
    let functionSignature = contractInterface.encodeFunctionData("setQuote", [
      "2",
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

  const sendSignedTransaction = async (
    userAddress: string,
    functionData: string,
    r: string,
    s: string,
    v: number
  ) => {
    try {
      if (!biconomy) {
        console.log("biconomy not initialized");
        return;
      }
      const provider = await biconomy.provider;
      console.log({ provider });
      const contractInstance = new ethers.Contract(
        config.contract.address,
        config.contract.abi,
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
        to: config.contract.address,
        from: userAddress,
        signatureType: "EIP712_SIGN",
      };
      // @ts-ignore
      const tx = await provider.send("eth_sendTransaction", [txParams]);
      console.log(tx);
      biconomy.on("txHashGenerated", (data: any) => {
        console.log(data);
      });
      biconomy.on("txMined", (data: any) => {
        console.log("txMined!");
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleListItem };
};

export default useMetaTx;
