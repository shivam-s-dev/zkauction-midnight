export function parseContractError(err: unknown): string {
  if (!err) return 'An unknown error occurred';
  
  const msg = err instanceof Error ? err.message : String(err);
  
  // Wallet / Signature errors
  if (msg.includes('User rejected') || msg.includes('User denied')) {
    return 'Transaction canceled in 1AM Wallet.';
  }
  
  // Network / RPC errors
  if (msg.includes('timeout') || msg.includes('network error') || msg.includes('fetch failed')) {
    return 'Network timeout. The Midnight Testnet may be congested. Please try again.';
  }

  // Contract specific logic errors (from auction.compact)
  if (msg.includes('Auction is not open')) {
    return 'This auction is no longer accepting bids.';
  }
  if (msg.includes('Bid must exceed current highest bid')) {
    return 'Your bid is too low. Someone already bid higher!';
  }
  if (msg.includes('Only the seller can')) {
    return 'You are not authorized. Only the seller can perform this action.';
  }
  if (msg.includes('Invalid reserve commitment')) {
    return 'Invalid reserve key. The salt or price provided is incorrect.';
  }
  
  // Generic / Unhandled
  // Truncate if it's a massive stack trace
  if (msg.length > 150) {
    return msg.substring(0, 150) + '...';
  }
  
  return msg;
}
