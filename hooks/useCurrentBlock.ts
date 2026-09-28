import { useState, useEffect } from 'react';

export function useCurrentBlock() {
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);

  useEffect(() => {
    // We can query the 1AM explorer API for the current block height
    const fetchBlock = async () => {
      try {
        const res = await fetch('https://explorer.1am.xyz/api/v1/blocks?network=preprod&limit=1');
        const data = await res.json();
        if (data && data.blocks && data.blocks.length > 0) {
          setCurrentBlock(data.blocks[0].height);
        }
      } catch (err) {
        console.warn('Failed to fetch current block:', err);
      }
    };

    fetchBlock();
    const interval = setInterval(fetchBlock, 15000); // every 15s

    return () => clearInterval(interval);
  }, []);

  return currentBlock;
}
