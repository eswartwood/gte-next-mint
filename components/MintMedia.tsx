'use client';
import { useState } from 'react';
import { ethers } from 'ethers';
import { MEDIA_CONTRACT_ADDRESS, MEDIA_CONTRACT_ABI } from '@/lib/contract';
import { ensurePolygon } from '@/lib/polygon';

export default function MintMedia() {
  const [busy, setBusy] = useState(false);
  const [tx, setTx] = useState<string>('');

  async function mint() {
    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) return alert('MetaMask not found');
      await ensurePolygon();

      if (!MEDIA_CONTRACT_ADDRESS || MEDIA_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
        return alert('Contract not set yet. Add NEXT_PUBLIC_MEDIA_CONTRACT_ADDRESS + ABI.');
      }
      if (!MEDIA_CONTRACT_ABI?.length) {
        return alert('ABI missing. Add MEDIA_CONTRACT_ABI in lib/contract.ts');
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(MEDIA_CONTRACT_ADDRESS, MEDIA_CONTRACT_ABI, signer);

      // === Example real mint ===
      // const tokenURI = 'ipfs://YOUR_CID_HERE';
      // const value = 0n; 
      // const response = await contract.mint(tokenURI, { value });
      // await response.wait();
      // setTx(response.hash);

      alert('Mint wired. Paste address + ABI in lib/contract.ts, then uncomment the real mint call.');
    } catch (e: any) {
      console.error(e);
      alert(e?.shortMessage || e?.message || 'Mint failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <button onClick={mint} disabled={busy}>
        {busy ? 'Minting…' : 'Mint Media'}
      </button>
      {tx && (
        <a href={`https://polygonscan.com/tx/${tx}`} target="_blank" rel="noreferrer">
          View on PolygonScan
        </a>
      )}
    </div>
  );
}