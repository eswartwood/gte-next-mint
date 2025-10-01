export const POLYGON_CHAIN_ID_HEX = '0x89'; // 137
export const POLYGON_PARAMS = {
  chainId: POLYGON_CHAIN_ID_HEX,
  chainName: 'Polygon Mainnet',
  nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
  rpcUrls: ['https://polygon-rpc.com'],
  blockExplorerUrls: ['https://polygonscan.com/'],
};

export async function ensurePolygon() {
  // @ts-ignore
  const { ethereum } = window;
  if (!ethereum) throw new Error('MetaMask not found');
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: POLYGON_CHAIN_ID_HEX }],
    });
  } catch (err: any) {
    if (err?.code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [POLYGON_PARAMS],
      });
    } else {
      throw err;
    }
  }
}