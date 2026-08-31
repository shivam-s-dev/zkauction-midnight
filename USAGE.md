# 📘 Usage Guide

> [!WARNING]
> **Network Notice:** ZKAuction runs on the **Midnight Preview Network**. All tokens used are test tokens with no real-world value.

This guide explains how to use ZKAuction as both a **Seller** (creating auctions) and a **Bidder** (placing bids), as well as how to settle and interact with the live Preview deployment.

---

## Accessing the Application

- **Live App**: [https://zkauction-midnight.vercel.app/](https://zkauction-midnight.vercel.app/)
- **Contract Explorer**: [View on 1AM Explorer](https://explorer.1am.xyz/contract/6eec85da7d92d58adf85637be652f1921e7233947ce76e9dda0d80e75bb83e65)

> [!NOTE]
> You must have the 1AM Wallet browser extension installed and funded with Preview tokens before using the app. See [SETUP.md](SETUP.md) for wallet setup instructions.

---

## Connecting Your Wallet

1. Visit the live app at [zkauction-midnight.vercel.app](https://zkauction-midnight.vercel.app/).
2. Click the **"Connect Wallet"** button in the top navigation bar.
3. The 1AM Wallet extension will pop up with a connection request — click **Approve**.
4. Your ZK-derived identity key will appear in the navbar. You are now connected.

---

## As a Seller — Creating an Auction

ZKAuction allows sellers to cryptographically **hide their reserve price**, so bidders cannot know the minimum threshold.

### Step 1: Navigate to Create Auction

Click the **"Create Auction"** button on the main Auction Dashboard.

### Step 2: Fill in Auction Details

| Field | Description |
| --- | --- |
| **Item Name** | The name or description of the item being auctioned |
| **Reserve Price** | The **minimum price** you are willing to accept (kept private — never shown on-chain) |
| **Duration** | How long the auction should remain open (in blocks) |

### Step 3: Submit the Auction

1. Click **"Create Auction"**.
2. The app will:
   - Generate a random cryptographic **salt** on your device.
   - Compute `hash(reserve_price, salt)` — the **reserve commitment**.
   - Submit a `createAuction` ZK transaction to the Midnight Network.
3. Approve the transaction in your 1AM Wallet.
4. Wait for the transaction to confirm (10–30 seconds for ZK proof generation).
5. Your auction will appear on the dashboard as **OPEN**.

> [!IMPORTANT]
> The reserve price and salt are **only stored on your device**. If you clear your browser data or switch devices, you may lose the ability to settle your auction.

---

## As a Bidder — Placing a Bid

Bidders can place bids on any **OPEN** auction. The reserve price is never revealed.

### Step 1: Browse Active Auctions

The **Auction Dashboard** lists all active auctions with their:
- Item name
- Current highest bid amount
- Current highest bidder (shown as a ZK-derived key, not a real wallet address)
- Auction status

### Step 2: Place a Bid

1. Click **"Place Bid"** on the auction you want to participate in.
2. Enter your **bid amount** (must be higher than the current highest bid).
3. Click **"Submit Bid"**.
4. Approve the `placeBid` ZK transaction in your 1AM Wallet.
5. Once confirmed, if your bid is the highest, you become the leading bidder.

> [!TIP]
> Your real wallet address is **never revealed on-chain**. The highest bidder is displayed as a ZK-derived identity key, ensuring complete bidder privacy.

---

## As a Seller — Settling an Auction

Once an auction ends (or you decide to finalize it), you can settle it.

### Step 1: Open the Auction

Find your auction on the dashboard and click **"Reveal & Settle"**.

### Step 2: Provide the Reserve Price

The app will ask you to re-enter your **reserve price** and **salt** (or retrieve them from local storage if available).

### Step 3: Submit Settlement

1. Click **"Settle Auction"**.
2. The app submits a `settle` ZK transaction to the Midnight Network.
3. The smart contract:
   - Verifies that `hash(reserve_price, salt) == reserve_commitment` (proving you know the original values).
   - Evaluates **privately** whether `highest_bid >= reserve_price`.
   - Declares the auction **SETTLED** or **EXPIRED** without revealing the reserve price.
4. The winner is declared based on the ZK verification result.

---

## Auction Lifecycle

```
OPEN ──► SETTLED (highest bid met reserve)
     └─► EXPIRED (reserve not met / auction ended)
```

| Status | Meaning |
| --- | --- |
| **OPEN** | Bids are being accepted |
| **SETTLED** | Auction finalized; highest bid met the reserve price |
| **EXPIRED** | Auction ended without meeting the reserve price |

---

## Understanding the Privacy Model

| Data | Visibility |
| --- | --- |
| Reserve Commitment (hash) | ✅ Public on-chain |
| Highest Bid Amount | ✅ Public on-chain |
| Highest Bidder (ZK Key) | ✅ Public on-chain |
| Auction Status | ✅ Public on-chain |
| **Actual Reserve Price** | 🔒 Private — never on-chain |
| **Seller's Salt** | 🔒 Private — stored only on seller's device |
| **Real Wallet Addresses** | 🔒 Private — hidden by ZK proofs |
| **Bid History Correlation** | 🔒 Private — cannot be linked |

---

## Smart Contract Circuits (Advanced)

The ZKAuction contract exposes four circuits. Understanding them helps you verify the privacy guarantees:

| Circuit | Called By | What It Does |
| --- | --- | --- |
| `createAuction(commitment)` | Seller | Initializes the auction; stores only the reserve commitment on-chain |
| `placeBid(amount)` | Bidder | Verifies new bid > current highest; updates state |
| `settle(reserve_price, salt)` | Seller | Proves commitment matches and privately evaluates if reserve was met |
| `withdrawExpired()` | Anyone | Allows fund withdrawal if auction expired without meeting reserve |

---

## Viewing Transactions on the Explorer

All on-chain activity can be verified publicly via the **1AM Midnight Explorer**:

- **Live Contract**: [View Contract](https://explorer.1am.xyz/contract/6eec85da7d92d58adf85637be652f1921e7233947ce76e9dda0d80e75bb83e65)
- **Network**: Midnight Preview (Preview)
