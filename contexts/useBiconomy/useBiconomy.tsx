import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { Biconomy } from "@biconomy/mexa";

// hooks
import { useAuth } from "../../contexts/useAuth";

// types
import { ExternalProvider } from "../../utils/types";

// constants
import {
  BICONOMY_API_KEY,
  NFT_MARKETPLACE_CONTRACT_ADDRESS,
} from "../../utils/constants";

interface IBiconomyContext {
  biconomy: Biconomy | null;
}

export const BiconomyContext = createContext<IBiconomyContext>({
  biconomy: null,
});

export function BiconomyProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [biconomy, setBiconomy] = useState<Biconomy | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initBiconomy = async () => {
      const biconomy = new Biconomy(window.ethereum as ExternalProvider, {
        apiKey: BICONOMY_API_KEY,
        debug: true,
        contractAddresses: [NFT_MARKETPLACE_CONTRACT_ADDRESS],
      });
      await biconomy.init();
      setBiconomy(biconomy);
    };
    if (isAuthenticated) {
      initBiconomy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <BiconomyContext.Provider value={{ biconomy }}>
      {children}
    </BiconomyContext.Provider>
  );
}

export default function useBiconomy() {
  return useContext(BiconomyContext);
}
