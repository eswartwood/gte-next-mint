'use client';
import Wallet from '@/components/Wallet';
import MintMedia from '@/components/MintMedia';
import MintAsset from '@/components/MintAsset';

export default function Home() {
  return (
    <main style={{ maxWidth:900, margin:'0 auto' }}>
      <h1 style={{ letterSpacing:1, marginBottom:8 }}>The Future of Ownership Starts Here!</h1>
      <p style={{ opacity:.8, marginTop:0 }}>Tokenize and monetize digital media and hard assets.</p>
      <div style={{ margin:'16px 0' }}><Wallet /></div>
      <div style={{ display:'flex', gap:12 }}>
        <MintMedia />
        <MintAsset />
      </div>
    </main>
  );
}