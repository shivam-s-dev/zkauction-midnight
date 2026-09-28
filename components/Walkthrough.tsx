'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Walkthrough() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem('zkauction:seen-walkthrough');
    if (!seen) {
      setIsOpen(true);
      localStorage.setItem('zkauction:seen-walkthrough', 'true');
    }
  }, []);

  if (!isOpen) return null;

  const slides = [
    {
      title: "Welcome to ZKAuction! 🎭",
      desc: "ZKAuction is a decentralized, privacy-preserving auction platform built on the Midnight Network. It uses Zero-Knowledge cryptography to hide reserve prices and protect bidder identities.",
    },
    {
      title: "Step 1: Install 1AM Wallet 🦊",
      desc: "To interact with ZKAuction, you need the 1AM Wallet browser extension configured to the Midnight Preprod (Preprod) Network. This wallet handles your private keys and zero-knowledge proofs.",
    },
    {
      title: "Step 2: Get tNIGHT Tokens 🚰",
      desc: "ZKAuction runs on a testnet, meaning the tokens have no real value. You can request free tNIGHT tokens from the official Midnight Faucet to start testing.",
    },
    {
      title: "Step 3: Create an Auction 🏷️",
      desc: "As a seller, you can create a 'Private Reserve Auction'. Your reserve price is combined with a random salt and hidden inside a ZK proof. It is never stored on the blockchain!",
    },
    {
      title: "Step 4: Place a Bid 💰",
      desc: "Bidders bid on the true value of the item, since they don't know the reserve price. Bidding is anonymous—your identity is masked using a derived ZK key.",
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else setIsOpen(false);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
        }}
        onClick={() => setIsOpen(false)}
      />
      
      <div
        className="glass"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 480,
          zIndex: 1001,
          padding: '32px',
          textAlign: 'center',
          animation: 'fadeUp 0.3s ease',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          ✕
        </button>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === step ? 'var(--purple-400)' : 'var(--glass-border)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          {slides[step].title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
          {slides[step].desc}
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          {step > 0 && (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)} style={{ flex: 1 }}>
              Back
            </button>
          )}
          <button className="btn btn-primary" onClick={handleNext} style={{ flex: step === 0 ? 'auto' : 2 }}>
            {step === slides.length - 1 ? "Let's Go!" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}
