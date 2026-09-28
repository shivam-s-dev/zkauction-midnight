'use client';

export function DemoBanner({ onExit }: { onExit: () => void }) {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
        color: '#fff',
        padding: '10px 20px',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        position: 'sticky',
        top: 64, // below navbar
        zIndex: 90,
      }}
    >
      <span>⚠️ DEMO MODE ACTIVE — No real transactions are happening.</span>
      <button
        onClick={onExit}
        style={{
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        Exit Demo
      </button>
    </div>
  );
}
