import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Return a mock if DB URL is missing (e.g. during Vercel build phase)
    return {
      auctionContract: {
        findMany: () => Promise.resolve([]),
        create:   () => Promise.resolve({}),
      },
      auctionEvent: {
        findMany: () => Promise.resolve([]),
        create:   () => Promise.resolve({}),
      },
    } as unknown as PrismaClient;
  }
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
