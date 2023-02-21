import { ethers } from "ethers";

// contexts
import { useBiconomy } from "../../contexts/useBiconomy";

// constants
import {
  NFT_MARKETPLACE_CONTRACT_ADDRESS_PERSONAL_SIGN,
  BASIC_NFT_CONTRACT_ADDRESS,
} from "../../utils/constants";

// abis
import NftMarketplace_Personal_sign from "../../contracts/abis/NftMarketplace_Personal_sign.json";

const useHandleListItemTwo = () => {
  const { biconomy } = useBiconomy();

  const handleListItem = async (tokenId: string) => {
    if (!biconomy) {
      console.log("biconomy not initialized");
      return;
    }

    console.log({ biconomy });

    const contractInstance = new ethers.Contract(
      NFT_MARKETPLACE_CONTRACT_ADDRESS_PERSONAL_SIGN,
      NftMarketplace_Personal_sign,
      biconomy.ethersProvider
    );

    console.log({ contractInstance });

    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedAddress = (await ethersProvider.listAccounts())[0];

    console.log({ connectedAddress });

    const options = {
      gasLimit: 10000000,
      gasPrice: 1000000000,
    };

    const tx = await contractInstance.populateTransaction.listItem(
      BASIC_NFT_CONTRACT_ADDRESS,
      tokenId,
      1,
      options
    );
    // const tx = await contractInstance.populateTransaction.buyItem(
    //   BASIC_NFT_CONTRACT_ADDRESS,
    //   tokenId
    // );

    console.log({ tx });

    const txDetails = {
      from: connectedAddress,
      to: NFT_MARKETPLACE_CONTRACT_ADDRESS_PERSONAL_SIGN,
      data: tx.data,
      signatureType: "PERSONAL_SIGN",
    };

    console.log({ txDetails });

    const provider = await biconomy.provider;
    console.log({ provider });
    // @ts-ignore
    const result = await provider.send("eth_sendTransaction", [txDetails]);

    console.log({ result });
  };

  return { handleListItem };
};

export default useHandleListItemTwo;
