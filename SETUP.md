# 🛠 Setup Guide

> [!WARNING]
> **Network Notice:** ZKAuction runs on the **Midnight Preprod (Preview) Network**. All tokens used are test tokens with no real-world value.

This guide walks you through setting up your Midnight wallet environment and running ZKAuction locally from scratch.

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Notes |
| --- | --- | --- |
| **Node.js** | `>= 22.x` | Required to run the app |
| **npm** | `>= 10.x` | Comes bundled with Node.js |
| **Git** | Latest | For cloning the repository |
| **Chromium Browser** | Latest | For the 1AM Wallet extension |

---

## Step 1: Install the 1AM Wallet

ZKAuction interacts with the Midnight Network via the **1AM Wallet** browser extension. This is required to sign transactions and manage your ZK identity.

1. Download the **1AM Wallet** extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/1am-wallet/kgdlehkipmdnboflkebhlhfbbkmehhhl) (or any compatible Chromium-based browser).
2. Open the extension and create a new wallet.
3. **Securely save your 24-word recovery phrase** — this is the only way to recover your wallet.
4. Click the **network dropdown** at the top of the wallet and switch it to **Midnight Preprod** (Preview Network).

---

## Step 2: Get Free Preview Tokens (Faucet)

You need test tokens (`tNIGHT`) to create auctions and place bids.

1. Open the 1AM Wallet and copy your wallet address.
2. Go to the [**Midnight Preview Faucet**](https://faucet.testnet-01.midnight.network/).
3. Paste your wallet address into the faucet form and submit.
4. Wait a few seconds. The tokens will appear in your wallet once the transaction confirms on-chain.

> [!TIP]
> You can request tokens multiple times if you run out during testing.

---

## Step 3: Clone the Repository

```bash
git clone https://github.com/shivam-s-dev/zkauction.git
cd ZKAuction
```

---

## Step 4: Install Dependencies

```bash
npm install
```

This will install all Node.js packages and also auto-generate the Prisma database client.

---

## Step 5: Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in the required values:

```env
# Midnight Network Configuration (Preview/Preprod)
NEXT_PUBLIC_MIDNIGHT_NETWORK=TestNet
NEXT_PUBLIC_NODE_WS_URL=wss://rpc.testnet-01.midnight.network/ws
NEXT_PUBLIC_INDEXER_URI=https://indexer.testnet-01.midnight.network/api/v1/graphql
NEXT_PUBLIC_INDEXER_WS_URI=wss://indexer.testnet-01.midnight.network/api/v1/graphql
NEXT_PUBLIC_PROOF_SERVER_URI=https://proving.testnet-01.midnight.network

# Database (Neon Postgres — required for off-chain metadata storage)
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
```

> [!NOTE]
> If you only want to test the smart contract interactions and don't need the off-chain DB, you can use a dummy database URL: `DATABASE_URL=postgres://dummy:dummy@localhost:5432/dummy`

---

## Step 6: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Step 7: Connect Your Wallet

1. Click the **"Connect Wallet"** button in the top navigation bar.
2. Your 1AM Wallet extension will pop up and request permission.
3. Approve the connection — you are now ready to create and bid on private auctions!

---

## Running Tests

To run the smart contract test suite locally:

```bash
# Run all tests (one-shot)
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode during development
npm run test:watch
```

---

## Building for Production

```bash
npm run build
```

This creates an optimized production bundle in the `.next/` directory.

---

## Troubleshooting

| Issue | Solution |
| --- | --- |
| Wallet not connecting | Make sure the 1AM Wallet extension is installed and set to the **Preview** network |
| `DATABASE_URL` error during build | Use a dummy URL or provide a real Neon Postgres connection string |
| ZK proof generation is slow | This is expected — ZK proofs are computationally intensive and can take 10–30 seconds |
| Transaction pending for a long time | The Midnight Preview Network may be congested; wait and retry |
