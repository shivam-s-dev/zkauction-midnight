import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/events?contractAddress=xxx
 * Returns the activity feed for one auction, newest first.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contractAddress = searchParams.get('contractAddress');

    if (!contractAddress) {
      return NextResponse.json({ error: 'contractAddress query param required' }, { status: 400 });
    }

    const events = await prisma.auctionEvent.findMany({
      where:   { contractAddress },
      orderBy: { createdAt: 'desc' },
      take:    50,
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

/**
 * POST /api/events
 * Records an on-chain event. Called from the frontend after each tx.
 * Body: { contractAddress, eventType, txHash?, amountMicro? }
 *
 * eventType: AUCTION_CREATED | BID_PLACED | SETTLED | EXPIRED | WITHDRAWN
 */
export async function POST(request: Request) {
  try {
    const { contractAddress, eventType, txHash, amountMicro } = await request.json();

    if (!contractAddress || !eventType) {
      return NextResponse.json({ error: 'contractAddress and eventType are required' }, { status: 400 });
    }

    const validTypes = ['AUCTION_CREATED', 'BID_PLACED', 'SETTLED', 'EXPIRED', 'WITHDRAWN'];
    if (!validTypes.includes(eventType)) {
      return NextResponse.json({ error: `Invalid eventType. Must be one of: ${validTypes.join(', ')}` }, { status: 400 });
    }

    const event = await prisma.auctionEvent.create({
      data: {
        contractAddress,
        eventType,
        txHash:      txHash      ?? null,
        amountMicro: amountMicro ? BigInt(amountMicro) : null,
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error recording event:', error);
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
