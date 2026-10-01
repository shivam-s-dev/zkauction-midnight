<div align="center">
  <img src="app/icon.png" alt="ZKAuction Logo" width="120" />
  
  # ZKAuction
  ### Private Reserve Auctions on the Midnight Network
  
  [![Lint CI](https://github.com/shivam-s-dev/zkauction/actions/workflows/lint.yml/badge.svg)](https://github.com/shivam-s-dev/zkauction/actions/workflows/lint.yml)
  [![Build CI](https://github.com/shivam-s-dev/zkauction/actions/workflows/build.yml/badge.svg)](https://github.com/shivam-s-dev/zkauction/actions/workflows/build.yml)
  [![Tests CI](https://github.com/shivam-s-dev/zkauction/actions/workflows/tests.yml/badge.svg)](https://github.com/shivam-s-dev/zkauction/actions/workflows/tests.yml)
  
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Midnight](https://img.shields.io/badge/Midnight_Preprod-8b5cf6?style=for-the-badge)
</div>

---

> [!WARNING]
> **Network Notice:** This decentralized application and its smart contracts are currently deployed on the **Midnight PREPROD Network**. All tokens used are test tokens with no real-world value.

---

## 📚 Documentation

| Document | Description |
| --- | --- |
| [📖 SETUP.md](SETUP.md) | Full environment setup: wallet, faucet, env vars, local dev server |
| [📘 USAGE.md](USAGE.md) | How to create auctions, place bids, settle, and understand the privacy model |
| [🔄 FEEDBACK.md](FEEDBACK.md) | Beta feedback implementation record — all 16 features shipped with commit links |
| [👥 LAUNCH_USER.md](LAUNCH_USER.md) | 70 verified Preprod beta testers with 1AM Explorer wallet links |
| [README.md](#) | Project overview, architecture, smart contracts, and CI/CD |

### Contents

- [🔗 Links](#-links)
- [🆕 September 2026 Updates](#-september-2026-updates)
- [💡 About the Product Idea](#-about-the-product-idea)
- [🔒 Privacy Model](#-privacy-model-what-an-observer-can-and-cannot-learn)
- [📸 Screenshots](#-screenshots)
- [📜 Smart Contracts Description](#-smart-contracts-description)
- [🏗 Project Architecture](#-project-architecture)
- [🔄 User Workflow](#-user-workflow)
- [📁 File Structure](#-file-structure)
- [✅ Test Cases](#-test-cases)
- [🛠 Getting Started](#-getting-started-for-first-time-users)
- [💬 Beta Feedback Program](#-beta-feedback-program)
- [🚀 Future Implementation & Real World Applications](#-future-implementation--real-world-applications)
- [🙏 Acknowledgements](#-acknowledgements)

---

## 🔗 Links

- **Live Deployed App**: [https://zkauction-midnight.vercel.app/](https://zkauction-midnight.vercel.app/) 
- **ZKAuction Pitch Deck**: [Product Pitch](https://drive.google.com/file/d/1OAIqYRCKKLT6c-4WYnT6KX1WgDCQgRUb/view?usp=sharing) 
- **Deployed Preprod Contract**: `253a2c03c18fe557274200dbfdd333f693ed72380d114099d6307955b3667e28` ([View on Explorer](https://explorer.1am.xyz/contract/253a2c03c18fe557274200dbfdd333f693ed72380d114099d6307955b3667e28))
- **Demo Video**: [https://youtu.be/6QF17lxBqp4](https://youtu.be/6QF17lxBqp4)
- **X (Twitter)**: [@zkauctionweb3](https://x.com/zkauctionweb3)

---

## 🆕 September 2026 Updates

> **Beta Phase:** Sep 25–29, 2026 · Midnight PREPROD Network · 70 verified testers

This wave marks ZKAuction's transition from prototype to a market-ready product. All updates were driven by real beta tester feedback collected via the [Beta Feedback Form](https://forms.gle/JZxhP95rocm9jHGQ8).

### Wave 1 — Beginner & Mobile (P0)
| Feature | Commit |
|---|---|
| 🎓 Interactive 5-step onboarding walkthrough | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| 📱 Mobile hamburger navigation menu | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| 🔐 Reserve price safe-keeping modal (download / localStorage backup) | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| ⚡ ZK proof step-by-step progress modal | [`31568c4`](https://github.com/shivam-s-dev/zkauction-midnight/commit/31568c4) |
| 🎮 Demo Mode — full UI walkthrough without a wallet | [`9f23556`](https://github.com/shivam-s-dev/zkauction-midnight/commit/9f23556) |

### Wave 2 — UX Polish (P1)
| Feature | Commit |
|---|---|
| ☀️🌙 Light / Dark theme toggle with localStorage persistence | [`b9c77b9`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b9c77b9) |
| ⏱ Real-time auction countdown timer (blocks → human-readable) | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| 💰 Live tNIGHT wallet balance display in Navbar | [`b8a242c`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b8a242c) |
| 🗂 My Auctions tab + Search & Filter bar | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| 📋 Copy-to-clipboard for contract addresses & TX hashes | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| 🔗 Shareable deep link per auction | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| ⏳ Duration presets (15 min / 1 hr / 4 hrs / 1 day / 3 days) | [`9f23556`](https://github.com/shivam-s-dev/zkauction-midnight/commit/9f23556) |

### Wave 3 — Power Features (P2)
| Feature | Commit |
|---|---|
| 🎨 Generative deterministic avatar per auction (on-chain `item_hash`) | [`d81060a`](https://github.com/shivam-s-dev/zkauction-midnight/commit/d81060a) |
| 🔴 Outbid / winning alert banners | [`ffaccfb`](https://github.com/shivam-s-dev/zkauction-midnight/commit/ffaccfb) |
| 🎉 Confetti celebration on auction settlement | [`d81060a`](https://github.com/shivam-s-dev/zkauction-midnight/commit/d81060a) |
| 🔗 1AM Explorer inline links on every card | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| 📋 Activity Feed — on-chain event timeline per auction (privacy-safe, no wallet addresses) | [`HEAD`](https://github.com/shivam-s-dev/zkauction-midnight/commits/main) |

### Smart Contract
| Item | Detail |
|---|---|
| **September Contract** | [`253a2c03c18fe557...`](https://explorer.1am.xyz/contract/253a2c03c18fe557274200dbfdd333f693ed72380d114099d6307955b3667e28) |
| **Network** | Midnight **PREPROD** |
| **Compiler** | Compact v0.5.3 |

---

## 💬 Beta Feedback Program

ZKAuction ran a structured 5-day open beta on the Midnight **PREPROD** network with **70 verified testers**.

| | |
|---|---|
| 📋 **Feedback Form** | [forms.gle/JZxhP95rocm9jHGQ8](https://forms.gle/JZxhP95rocm9jHGQ8) |
| 📊 **Responses Sheet** | [View Beta Responses](https://forms.gle/JZxhP95rocm9jHGQ8) |
| 👥 **Beta Testers** | [LAUNCH_USER.md](LAUNCH_USER.md) — 70 verified Preprod wallets |
| 🔄 **Implementation Record** | [FEEDBACK.md](FEEDBACK.md) — 15/16 features shipped |

### Beta Results

- **50 feedback submissions** collected (Sep 25–29, 2026)
- **Average UX rating:** 4.9 / 5
- **Average 1AM + ZK ease rating:** 4.7 / 5
- **Bug reports:** 0
- **Features requested → shipped:** 15 of 16 within the beta window

All feedback is mapped to implementation commits in [FEEDBACK.md](FEEDBACK.md). Every shipped feature has a direct link to its GitHub commit for full traceability.

---

## 💡 About the Product Idea

### The Problem
In traditional transparent blockchains, auction parameters such as the reserve price are fully public. This creates a significant disadvantage for sellers, as bidders will often wait until the last minute and bid exactly the reserve price, artificially suppressing the true market value of the item. Furthermore, bidders' identities and bidding strategies are completely visible, allowing competitors to track their behavior, maliciously outbid them, or front-run their transactions using MEV bots.

### The Solution
ZKAuction solves this by leveraging the Midnight Network's zero-knowledge (ZK) data protection capabilities. By utilizing ZK smart contracts (written in Compact), ZKAuction allows sellers to cryptographically hide their reserve price. Bidders can place bids freely without knowing the exact reserve limit. When the auction ends, the smart contract settles the auction and proves whether the highest bid met the hidden reserve price—without ever revealing the reserve price itself! Additionally, bidder identities are kept strictly private and decoupled from their real wallet addresses.

---

## 🔒 Privacy Model: What an observer can and cannot learn

ZKAuction heavily relies on Midnight's hybrid state model to ensure maximum privacy and security:

- **What an observer CAN learn (Public On-chain State):**
  - `reserve_commitment`: A cryptographic hash of the reserve price and a random salt.
  - `highest_bid`: The current highest bid amount.
  - `highest_bidder`: A ZK-derived identity key (NOT the actual wallet address).
  - `status`: Whether the auction is OPEN, SETTLED, or EXPIRED.
  - `bid_count`: Total number of bids placed.

- **What an observer CANNOT learn (Private Zero-Knowledge Witness):**
  - **Actual Reserve Price**: Kept entirely secret on the seller's device.
  - **Seller's Private Salt**: Used to generate the commitment; never touches the chain.
  - **Real Wallet Addresses**: Hidden behind ZK proofs to prevent identity tracking.
  - **Bid History Correlation**: Observers cannot determine who placed which bid.

---

## 📸 Screenshots

### 1. Landing Page
![Landing Page](assets/PROJECT/landing-page.png)
*The landing page welcoming users to the ZKAuction platform with a fully responsive, dark-mode glassmorphism design.*

### 2. Loading Screen
![Loading Screen](assets/PROJECT/loading-screen.png)
*A sleek loading overlay that displays when the app is actively syncing state with the Midnight blockchain.*

### 3. Auction Dashboard
![Auction Dashboard](assets/PROJECT/auction-page.png)
*The main dashboard displaying live auctions, their ZK-protected states, and the highest ZK-derived bidder keys.*

### 4. Create Auction
![Create Auction](assets/PROJECT/create-auction.png)
*Sellers can easily create a new auction by entering their item details and a hidden reserve price.*

### 5. Place Bid
![Place Bid](assets/PROJECT/place-bid.png)
*Bidders can securely place bids on active auctions without ever seeing the hidden reserve price.*

### 6. Privacy Model Overview
![Privacy Model](assets/PROJECT/privacy-model.png)
*The platform clearly breaks down what data is visible on-chain and what is strictly protected by zero-knowledge proofs.*

---

## 📜 Smart Contracts Description

The ZKAuction smart contract is written in **Compact** (Midnight's specialized ZK DSL). It exposes four main circuits:

1. `createAuction`: Initializes the auction. The seller provides the `reserve_price` and a `salt` as private witnesses. The circuit computes the hash and stores only the `reserve_commitment` in the public state.
2. `placeBid`: Allows anyone to place a bid. The circuit verifies that the new bid is higher than the current `highest_bid` and updates the public state accordingly.
3. `settle`: Called by the seller to finalize the auction. The seller provides the original `reserve_price` and `salt`. The circuit proves that `hash(reserve_price, salt) == reserve_commitment` and securely evaluates if the `highest_bid >= reserve_price`.
4. `withdrawExpired`: If the auction reaches its end block without meeting the reserve, participants can safely withdraw their locked funds.

### Deployed Contracts & Transactions

> [!NOTE]
> All transactions and contracts below are on the **Midnight PREPROD Network**. You can verify them on the [1AM Explorer](https://explorer.1am.xyz).

| Action / Type | Address / Hash | Explorer Link |
| --- | --- | --- |
| **Deployed Contract** | `253a2c03c18fe557274200dbfdd333f693ed72380d114099d6307955b3667e28` | [View Contract](https://explorer.1am.xyz/contract/253a2c03c18fe557274200dbfdd333f693ed72380d114099d6307955b3667e28) |

### Contract Code & Deployment Images

#### ZKAuction Compact Circuit
![Circuit Code](assets/SMART%20CONTRACTS/circuit%20screenshot.png)
*A snippet of our zero-knowledge smart contract written in Midnight's Compact language.*



## 🏗 Project Architecture

```mermaid
graph TD
    A[Next.js Frontend] -->|API Routes| B(Prisma / Neon Postgres)
    A -->|window.midnight.1am| C{1AM Wallet}
    C -->|Sign Tx| D[Midnight Preprod Network]
    A -->|Midnight JS SDK| D
    A -->|Local ZK Proofs| E[Midnight Proof Server]
    B -->|Store off-chain data| F[(Neon DB)]
    D -->|Read on-chain state| A
```

---

## 🔄 User Workflow

```mermaid
sequenceDiagram
    actor Seller
    actor Bidder
    participant ZKAuction App
    participant Midnight Network

    Seller->>ZKAuction App: Enter Item Name & Reserve Price
    ZKAuction App->>ZKAuction App: Hash(Reserve Price, Salt)
    ZKAuction App->>Midnight Network: createAuction(Commitment)
    Midnight Network-->>ZKAuction App: Contract Deployed
    Bidder->>ZKAuction App: View Active Auctions
    Bidder->>ZKAuction App: Enter Bid Amount
    ZKAuction App->>Midnight Network: placeBid()
    Midnight Network-->>ZKAuction App: Highest Bid Updated
    Seller->>ZKAuction App: Click "Reveal & Settle"
    ZKAuction App->>Midnight Network: settle(Private Reserve Price, Salt)
    Midnight Network-->>ZKAuction App: Auction Settled / Winner Declared
```

---

## 📁 File Structure

```text
ZKAuction/
├── app/                    # Next.js App Router (Frontend)
│   ├── api/                # API Routes for database interactions
│   ├── auctions/           # Main Auction Dashboard page
│   └── globals.css         # UI Design system (Tailwind)
├── components/             # Reusable React components (Navbar, AuctionCard)
├── contract/
│   └── src/
│       ├── auction.compact # The Midnight ZK Smart Contract
│       └── auction.test.ts # Smart Contract automated tests
├── hooks/                  # Custom React hooks (e.g., useWallet)
├── lib/                    # Core logic and Midnight SDK integration
│   ├── auction-api.ts      # Wraps the Midnight JS SDK for auction interactions
│   ├── providers.ts        # Configures the 6 Midnight providers
│   └── prisma.ts           # Database client
├── prisma/                 # Prisma schema for Neon Postgres DB
├── public/                 # Static assets and ZK compiled keys
├── SETUP.md                # Environment setup guide
├── USAGE.md                # Full usage guide for sellers and bidders
└── scripts/                # Utility deployment scripts
```

---

## ✅ Test Cases

The smart contract is rigorously tested using Vitest and the Midnight testing environment to ensure the privacy and security of the ZK circuits.

**How to run the tests locally:**
```bash
# Install dependencies
npm install

# Run the test suite
npm test
```

### Test Results

![Test Suite Passed](assets/TEST/test%20screenshot.png)
*All 15 rigorous test cases testing the ZK logic, privacy constraints, and auction lifecycle have passed successfully in the Midnight test environment.*

---

## 🛠 Getting Started (For First-Time Users)

If you are a judge or a new user wanting to run this project locally, follow these simple steps. For a detailed walkthrough, see [SETUP.md](SETUP.md).

### Step 1: Install the 1AM Wallet
ZKAuction interacts with the Midnight Network via the 1AM Wallet browser extension.
1. Download the **1AM Wallet** extension from the Chrome Web Store (or compatible Chromium browser).
2. Create a new wallet and securely save your 24-word recovery phrase.
3. Once created, click on the network dropdown at the top of the wallet and ensure it is set to **Midnight Preprod** (Preprod).

### Step 2: Get Free Preprod Tokens (Faucet)
You need test tokens (tNIGHT) to deploy contracts and place bids.
1. Copy your wallet address from the 1AM Wallet extension.
2. Go to the [Midnight Preprod Faucet](https://faucet.testnet-01.midnight.network/).
3. Paste your address, request tokens, and wait a few seconds. Your wallet will be funded!

### Step 3: Run ZKAuction Locally
Now that your wallet is ready, let's run the application.

```bash
# 1. Clone the repository
git clone https://github.com/shivam-s-dev/zkauction.git
cd ZKAuction

# 2. Install Node.js dependencies
npm install

# 3. Set up environment variables
# (You only need a Postgres database URL if you are testing the backend DB sync)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Click **"Connect Wallet"**, approve the connection in your 1AM extension, and you are ready to create private auctions!

For full usage instructions (creating auctions, bidding, settling), see [USAGE.md](USAGE.md).

---

## 🚀 Future Implementation & Real World Applications

**Future Enhancements:**
- **Dynamic Bidding:** Implementing auto-bidding limits without revealing maximum bids.
- **Multi-token support:** Allowing bids in stablecoins or other Midnight-native tokens.
- **NFT Integration:** Extending the contract to officially transfer Midnight-native NFTs to the winner upon settlement.

**Real World Applications:**
- **High-Value Art & Real Estate:** Wealthy buyers often want to bid anonymously. Sellers want to ensure their minimum acceptable price is hidden to drive competitive bidding.
- **Sealed-bid Procurements:** Government and corporate contract bidding where prices must remain completely secret until the auction ends.
- **DeFi Liquidations:** Liquidating collateral privately without causing market panic or front-running by MEV bots.

---

## 🙏 Acknowledgements

This project was built to showcase the power of the Midnight Network. Working with Midnight's zero-knowledge capabilities provided an excellent environment for developing privacy-preserving decentralized applications.

Special thanks to the Midnight team for their robust documentation and support, and to the Midnight community for their valuable feedback and testing assistance throughout the development process.
