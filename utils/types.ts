export type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
};

export interface INftMetadata {
  name: string;
  description: string;
  image: string;
}

export interface INft {
  title: string;
  id: {
    tokenId: string;
  };
  contract: {
    address: string;
  };
  metadata: INftMetadata;
}
