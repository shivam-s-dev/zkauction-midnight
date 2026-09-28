'use client';

/**
 * components/Navbar.tsx
 * Top navigation bar with ZKAuction branding, 1AM wallet connect button, theme toggle, and mobile menu.
 */

import { useState } from 'react';
import type { WalletHookState } from '@/hooks/useWallet';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

interface NavbarProps {
  wallet: WalletHookState;
}

export function Navbar({ wallet }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--glass-border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'var(--glass-bg)',
      }}
    >
      <div className="px-4 md:px-6 h-16" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: 24, height: 24 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          
          {/* ZKAuction logo from /public/logo.png */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.5))',
              }}
            >
              <img
                src="/logo.png"
                alt="ZKAuction logo"
                width={40}
                height={40}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 18,
                  background: 'var(--grad-purple-cyan)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em',
                }}
              >
                ZKAuction
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginTop: -2,
                }}
              >
                Midnight Network
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/auctions">Auctions</NavLink>
          <NavLink href="/privacy">Privacy Model</NavLink>
        </nav>

        {/* Wallet button area & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4 position-relative">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          
          <div style={{ position: 'relative' }}>
            {wallet.isConnected ? (
              <ConnectedBadge
                address={wallet.shortAddress!}
                balance={wallet.balance}
                onDisconnect={wallet.disconnect}
              />
            ) : wallet.isPendingError ? (
              <PendingErrorBadge onReset={wallet.resetAndReconnect} onDiscard={wallet.disconnect} />
            ) : (
              <>
                <button
                  id="wallet-connect-btn"
                  className="btn btn-primary"
                  onClick={wallet.connect}
                  disabled={wallet.isConnecting}
                  aria-label="Connect 1AM wallet"
                  style={{ gap: 8, fontSize: 13, padding: '9px 18px' }}
                >
                  {wallet.isConnecting ? (
                    <>
                      <span className="spinner" style={{ width: 14, height: 14 }} />
                      Connecting…
                    </>
                  ) : (
                    <>
                      <WalletIcon />
                      Connect Wallet
                    </>
                  )}
                </button>
                {wallet.isConnecting && wallet.debugInfo && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 8,
                    padding: '8px 14px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 8,
                    fontSize: 12,
                    color: 'var(--purple-400)',
                    whiteSpace: 'nowrap',
                    zIndex: 200,
                  }}>
                    ⏳ {wallet.debugInfo}
                  </div>
                )}
                {!wallet.isConnecting && wallet.error && !wallet.isPendingError && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 8,
                    padding: '10px 14px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 8,
                    fontSize: 12,
                    color: '#fca5a5',
                    maxWidth: 280,
                    zIndex: 200,
                  }}>
                    ⚠️ {wallet.error}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden" style={{ borderTop: '1px solid var(--glass-border)', padding: '16px 24px', background: 'var(--bg-elevated)' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <Link href="/auctions" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Auctions</Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Privacy Model</Link>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Theme</span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <div>
            {wallet.isConnected ? (
              <ConnectedBadge
                address={wallet.shortAddress!}
                balance={wallet.balance}
                onDisconnect={() => { wallet.disconnect(); setMenuOpen(false); }}
              />
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { wallet.connect(); setMenuOpen(false); }}
              >
                <WalletIcon />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeToggle({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) {
  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: 'rgba(139,92,246,0.1)',
        border: '1px solid var(--glass-border)',
        borderRadius: '50%',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--text-primary)',
      }}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)';
        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,92,246,0.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
      }}
    >
      {children}
    </Link>
  );
}

function PendingErrorBadge({
  onReset,
  onDiscard,
}: {
  onReset: () => void;
  onDiscard: () => void;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        background: 'rgba(251,191,36,0.08)',
        border: '1px solid rgba(251,191,36,0.4)',
        borderRadius: 10,
        fontSize: 13,
        color: '#fde68a',
        cursor: 'default',
      }}>
        <span>⏳</span>
        <span>Connection pending…</span>
      </div>

      <div style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        background: 'var(--bg-elevated)',
        border: '1px solid rgba(251,191,36,0.35)',
        borderRadius: 12,
        padding: '16px',
        width: 300,
        zIndex: 300,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}>
        <p style={{ fontSize: 13, color: '#fde68a', fontWeight: 600, margin: '0 0 6px' }}>
          ⚠️ Wallet popup already open
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.5 }}>
          The 1AM wallet has a connection request waiting. Either{' '}
          <strong style={{ color: 'var(--text-primary)' }}>approve or reject it</strong>{' '}
          in the extension popup, then click Retry below.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-primary"
            onClick={onReset}
            style={{ fontSize: 12, padding: '7px 14px', flex: 1, gap: 6 }}
          >
            🔄 Discard & Retry
          </button>
          <button
            className="btn btn-ghost"
            onClick={onDiscard}
            style={{ fontSize: 12, padding: '7px 12px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ConnectedBadge({ address, balance, onDisconnect }: { address: string; balance: string | null; onDisconnect: () => void }) {
  const isLowBalance = balance && Number(balance) < 50;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {balance && (
        <div
          style={{
            padding: '8px 12px',
            background: isLowBalance ? 'rgba(251,191,36,0.1)' : 'rgba(139,92,246,0.1)',
            border: `1px solid ${isLowBalance ? 'rgba(251,191,36,0.3)' : 'rgba(139,92,246,0.2)'}`,
            borderRadius: 10,
            fontSize: 13,
            color: isLowBalance ? '#fde68a' : 'var(--text-primary)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
          title="tNIGHT Balance"
        >
          ⬡ {balance}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: 'rgba(74,222,128,0.08)',
          border: '1px solid rgba(74,222,128,0.25)',
          borderRadius: 10,
          fontSize: 13,
        }}
      >
        <span className="pulse-dot" />
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 500 }}>
          {address}
        </span>
      </div>
      <button
        onClick={onDisconnect}
        className="btn btn-ghost"
        style={{ fontSize: 12, padding: '7px 12px' }}
        aria-label="Disconnect wallet"
      >
        Disconnect
      </button>
    </div>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 15, height: 15 }}>
      <path d="M1 4.25a3.733 3.733 0 012.25-.75h13.5c.844 0 1.624.279 2.25.75A2.25 2.25 0 0016.75 2H3.25A2.25 2.25 0 001 4.25zM1 7.25a3.733 3.733 0 012.25-.75h13.5c.844 0 1.624.279 2.25.75A2.25 2.25 0 0016.75 5H3.25A2.25 2.25 0 001 7.25zM7 8a1 1 0 000 2 2 2 0 110 4H7a1 1 0 100 2h1a4 4 0 100-8H7z" />
      <path d="M1.5 9.5A2.5 2.5 0 014 7h13a2.5 2.5 0 012.5 2.5v7A2.5 2.5 0 0117 19H4a2.5 2.5 0 01-2.5-2.5v-7zm14 4.5a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}
