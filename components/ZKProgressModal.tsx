'use client';

interface Props {
  isOpen: boolean;
  step: number; // 0=Preparing, 1=Proving, 2=Submitting, 3=Done
}

export function ZKProgressModal({ isOpen, step }: Props) {
  if (!isOpen) return null;

  const steps = [
    { label: 'Preparing Witnesses', desc: 'Fetching private state and syncing chain data' },
    { label: 'Generating ZK Proof', desc: 'Executing local circuit locally (this takes ~15s)' },
    { label: 'Submitting to Midnight', desc: 'Awaiting wallet signature and network inclusion' },
    { label: 'Confirmed!', desc: 'Transaction successfully included in the ledger' },
  ];

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 400,
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
          zIndex: 401,
          padding: 24,
        }}
      >
        <div
          className="glass"
          style={{
            width: '100%',
            maxWidth: 440,
            padding: '32px',
            animation: 'fadeUp 0.3s ease',
            border: '1px solid var(--purple-400)',
            boxShadow: '0 0 80px rgba(139,92,246,0.2)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>
              {step === 3 ? '🎉' : '🛡️'}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Zero-Knowledge Transaction
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
              Your data never leaves your device.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => {
              const isActive = i === step;
              const isPast = i < step;
              return (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', opacity: isActive || isPast ? 1 : 0.4 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: isPast ? 'var(--green-400)' : isActive ? 'var(--purple-400)' : 'transparent',
                      border: `2px solid ${isPast ? 'var(--green-400)' : isActive ? 'var(--purple-400)' : 'var(--glass-border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000',
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                      boxShadow: isActive ? '0 0 16px var(--purple-400)' : 'none',
                    }}
                  >
                    {isPast ? '✓' : i + 1}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>
                      {s.label}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
