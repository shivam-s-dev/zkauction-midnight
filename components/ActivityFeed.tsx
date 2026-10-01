'use client';

import { useEffect, useState, useCallback } from 'react';

interface AuctionEvent {
  id:              string;
  contractAddress: string;
  eventType:       'AUCTION_CREATED' | 'BID_PLACED' | 'SETTLED' | 'EXPIRED' | 'WITHDRAWN';
  txHash:          string | null;
  amountMicro:     string | null;  // JSON serialises BigInt as string
  createdAt:       string;
}

interface ActivityFeedProps {
  contractAddress: string;
  /** Pass a new value here to trigger a refresh (e.g. increment after each tx) */
  refreshKey?: number;
}

const EVENT_META: Record<string, { icon: string; label: string; color: string }> = {
  AUCTION_CREATED: { icon: '🚀', label: 'Auction Created',  color: '#a78bfa' },
  BID_PLACED:      { icon: '⚡', label: 'New Bid Placed',   color: '#22d3ee' },
  SETTLED:         { icon: '✅', label: 'Auction Settled',  color: '#4ade80' },
  EXPIRED:         { icon: '⏱️', label: 'Auction Expired',  color: '#f87171' },
  WITHDRAWN:       { icon: '💸', label: 'Bid Withdrawn',    color: '#fb923c' },
};

function formatAmount(amountMicro: string | null): string | null {
  if (!amountMicro) return null;
  const night = (Number(amountMicro) / 1_000_000).toFixed(2);
  return `${night} tNIGHT`;
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60)  return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function ActivityFeed({ contractAddress, refreshKey = 0 }: ActivityFeedProps) {
  const [events, setEvents]   = useState<AuctionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      const res  = await fetch(`/api/events?contractAddress=${contractAddress}`);
      const data = await res.json();
      if (data.events) setEvents(data.events);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [contractAddress]);

  useEffect(() => {
    setLoading(true);
    fetchEvents();
  }, [fetchEvents, refreshKey]);

  if (loading) {
    return (
      <div style={{ padding: '12px 0', color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>
        Loading activity...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '12px 0', color: 'var(--text-muted)', fontSize: 12, textAlign: 'center' }}>
        Activity feed unavailable
      </div>
    );
  }

  return (
    <div
      style={{
        background:   'rgba(255,255,255,0.02)',
        border:       '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding:      '14px 16px',
        marginTop:    16,
      }}
    >
      <p
        style={{
          fontSize:      11,
          fontWeight:    600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         'var(--text-muted)',
          marginBottom:  12,
        }}
      >
        📋 Activity Feed
      </p>

      {events.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0' }}>
          No activity yet
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {events.map((ev) => {
            const meta   = EVENT_META[ev.eventType] ?? { icon: '•', label: ev.eventType, color: '#888' };
            const amount = formatAmount(ev.amountMicro);
            return (
              <div
                key={ev.id}
                style={{
                  display:    'flex',
                  alignItems: 'flex-start',
                  gap:        10,
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    width:        28,
                    height:       28,
                    borderRadius: '50%',
                    background:   `${meta.color}18`,
                    border:       `1px solid ${meta.color}44`,
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    fontSize:     13,
                    flexShrink:   0,
                    marginTop:    1,
                  }}
                >
                  {meta.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: meta.color }}>
                      {meta.label}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 8 }}>
                      {timeAgo(ev.createdAt)}
                    </span>
                  </div>

                  {amount && (
                    <span
                      style={{
                        fontSize:     12,
                        color:        'var(--text-secondary)',
                        fontFamily:   'var(--font-mono)',
                        display:      'block',
                        marginTop:    2,
                      }}
                    >
                      Bid: {amount}
                    </span>
                  )}

                  {ev.txHash && (
                    <a
                      href={`https://explorer.1am.xyz/tx/${ev.txHash}?network=preprod`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize:       11,
                        color:          'var(--cyan-400)',
                        textDecoration: 'none',
                        fontFamily:     'var(--font-mono)',
                        display:        'block',
                        marginTop:      2,
                        overflow:       'hidden',
                        textOverflow:   'ellipsis',
                        whiteSpace:     'nowrap',
                      }}
                    >
                      Tx: {ev.txHash.slice(0, 24)}… ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
