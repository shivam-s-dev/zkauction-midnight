'use client';

/**
 * components/ReserveKeySafeModal.tsx
 * Shown right after auction creation to ensure sellers save their reserve price and salt.
 */

interface Props {
  isOpen: boolean;
  address: string;
  reservePrice: string; // The formatted tNIGHT amount or microNIGHT amount
  salt: string;
  onClose: () => void;
}

export function ReserveKeySafeModal({ isOpen, address, reservePrice, salt, onClose }: Props) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const data = `
=========================================
ZKAuction - Private Reserve Key
=========================================

Contract Address: ${address}
Reserve Price:    ${reservePrice}
Salt (Hex):       ${salt}

KEEP THIS FILE SAFE!
You will need these exact values to settle the auction and claim your funds.
If you lose the salt, you cannot prove the reserve price to the smart contract.
=========================================
`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zkauction-key-${address.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div
        role="presentation"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 300,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 301,
          padding: '20px',
        }}
      >
        <div
          className="glass"
          style={{
            width: '100%',
            maxWidth: 500,
            padding: '32px',
            animation: 'fadeUp 0.3s ease',
            border: '1px solid var(--purple-400)',
            boxShadow: '0 0 60px rgba(139,92,246,0.3)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 48 }}>🗝️</span>
            <h2 style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-display)', marginTop: 12, color: 'var(--text-primary)' }}>
              Save Your Reserve Key!
            </h2>
            <p style={{ color: 'var(--red-400)', fontSize: 14, fontWeight: 500, marginTop: 8 }}>
              Warning: If you lose these, you cannot settle your auction.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--text-primary)',
              wordBreak: 'break-all',
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'block', textTransform: 'uppercase' }}>Contract</span>
              {address}
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'block', textTransform: 'uppercase' }}>Reserve Price (µNIGHT)</span>
              {reservePrice}
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'block', textTransform: 'uppercase' }}>Salt (Hex)</span>
              <span style={{ color: 'var(--purple-400)' }}>{salt}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" onClick={handleDownload} style={{ flex: 1 }}>
              📥 Download .txt
            </button>
            <button className="btn btn-primary" onClick={onClose} style={{ flex: 1 }}>
              I Saved It Safely
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
