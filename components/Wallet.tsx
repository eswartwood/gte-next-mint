'use client';
import { useEffect, useState } from 'react';
import { ensurePolygon } from '@/lib/polygon';

export default function Wallet({ onReady }: { onReady?: (addr: string) => void }) {
  const [address, setAddress] = useState<string>('');
  const [connecting, setConnecting] = useState(false);

  async function connect() {
    // @ts-ignore
    const { ethereum } = window;
    if (!ethereum) return alert('MetaMask not found');
    setConnecting(true);
    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
      const addr = accounts[0];
      await ensurePolygon();
      setAddress(addr);
      onReady?.(addr);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Failed to connect');
    } finally {
      setConnecting(false);
    }
  }

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    if (!ethereum) return;
    const handle = () => connect();
    ethereum.on?.('accountsChanged', handle);
    ethereum.on?.('chainChanged', handle);
    return () => {
      ethereum.removeListener?.('accountsChanged', handle);
      ethereum.removeListener?.('chainChanged', handle);
    };
  }, []);

  return (
    <div style={{ display:'flex', gap:12, alignItems:'center' }}>
      {address ? (
        <span>Connected: {address.slice(0,6)}…{address.slice(-4)} (Polygon)</span>
      ) : (
        <button onClick={connect} disabled={connecting}>
          {connecting ? 'Connecting…' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}