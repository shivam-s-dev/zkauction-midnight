'use client';

import { useState } from 'react';

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{
        background: 'none',
        border: 'none',
        color: copied ? 'var(--green-400)' : 'var(--purple-400)',
        cursor: 'pointer',
        fontSize: 14,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
      }}
    >
      {copied ? '✓ Copied' : '📋'}
    </button>
  );
}
