import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// constants
import { IPFS_URL } from "../../../utils/constants";

// query keys
import { TOKEN_BY_URI } from "../../../utils/queryKeys";

const fetchTokenURI = async (tokenURI: string) => {
  const requestURL = tokenURI.replace("ipfs://", IPFS_URL);
  const { data } = await axios.get(requestURL);
  return data;
};

const useGetTokenByURI = (tokenURI: string) => {
  const { data, ...rest } = useQuery(
    [TOKEN_BY_URI, tokenURI],
    () => fetchTokenURI(tokenURI),
    {
      enabled: !!tokenURI,
    }
  );
  const tokenData = {
    ...data,
    image: data?.image?.replace("ipfs://", IPFS_URL),
  };

  return { data: tokenData, ...rest };
};

export default useGetTokenByURI;
