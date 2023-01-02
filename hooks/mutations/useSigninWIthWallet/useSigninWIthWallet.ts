import { ethers } from "ethers";

// hooks
import {
  useGetNonceToSignLazyQuery,
  useLoginWithWalletMutation,
  UserWithToken,
} from "../../../generated/auth";

export const useSigninWIthWallet = () => {
  const [getNonceToSign] = useGetNonceToSignLazyQuery({
    fetchPolicy: "network-only",
  });

  const [loginWithWalletMutation] = useLoginWithWalletMutation();

  const handleLogin = async (): Promise<UserWithToken> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();

    return getNonceToSign({ variables: { walletAddress } }).then(
      async (res) => {
        // @ts-ignore
        const { data: { nonceToSign: { nonce } } = {} } = res;
        try {
          const signature = await signer.signMessage(String(nonce));
          // TODO: Maybe just return the mutation
          return loginWithWalletMutation({
            variables: {
              walletAddress: walletAddress,
              message: String(nonce),
              signedMessage: signature,
            },
          }).then(
            ({
              data: {
                // @ts-ignore
                loginWithWallet,
              },
            }) => {
              return loginWithWallet;
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  return { handleLogin };
};
