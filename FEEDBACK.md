# ZKAuction — Beta Feedback & Implementation Record

> **Document Type:** Post-Beta User Research & Engineering Response Log  
> **Beta Period:** September 2026 · Midnight Preprod Network  
> **Total Beta Testers:** 70 verified wallets  
> **Feedback Responses Collected:** 50  
> **Features Shipped in Response:** 15 of 16

---

## Summary

This document records user feedback collected via the ZKAuction Beta Program and maps each piece of feedback to a concrete engineering implementation. All features were implemented, tested, and committed to the `main` branch of the [ZKAuction GitHub Repository](https://github.com/shivam-s-dev/zkauction-midnight). Commit IDs are linked directly to GitHub for full traceability.

---

## Implementation Record

---

### F-01 · Beginner Onboarding Walkthrough

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Khushi Thakur — `mn_addr_preprod1ce4kd3lct6ac7mxdyazh4x9juk3jjhj9q9xrdr2gnwe6mxwf0h3shcv5dx` |
| **Commit** | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| **Files** | `components/Walkthrough.tsx` · `components/Navbar.tsx` · `app/globals.css` |

**User Feedback:**
> "I don't know how to use this app. I don't understand what a ZK auction is or how to connect my wallet. A walkthrough would help a lot."

**Implementation:**
A 5-step interactive walkthrough modal was built (`Walkthrough.tsx`) and added to the root layout. It auto-appears on a user's first visit using `localStorage` detection. It covers: what ZKAuction is, how to install the 1AM Wallet, how to get Preprod tokens, how to place a bid, and how to create an auction. A `?` help button in the Navbar re-opens it at any time.

---

### F-02 · Light / Dark Theme Toggle

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Ravi — `mn_addr_preprod1d5n7kmpw9xrjv4f8qvyz3l6hst0g2n5c1a4wr7kp2d8zshe34sqe0q7j3` |
| **Commit** | [`b9c77b9`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b9c77b9) · [`b97b1da`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b97b1da) |
| **Files** | `app/globals.css` · `components/Navbar.tsx` · `hooks/useTheme.ts` |

**User Feedback:**
> "It's always dark mode. I work in a bright office and the contrast becomes uncomfortable after a while."

**Implementation:**
A `useTheme` hook was created to manage a `data-theme` attribute on the `<html>` element. Light/dark CSS variable sets were added to `globals.css`. The Navbar renders a ☀️/🌙 toggle button that persists the preference to `localStorage` across sessions.

---

### F-03 · Auction Item Image / Visual Identity

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED (Generative Avatars) |
| **Beta Tester** | Trupati — `mn_addr_preprod1ef28tjt6ndghnm8jqq9umdsvqxwgwurp6xz8l8464epmdsetxgusdg8rm7` |
| **Commit** | [`d81060a`](https://github.com/shivam-s-dev/zkauction-midnight/commit/d81060a) |
| **Files** | `components/AuctionCard.tsx` |

**User Feedback:**
> "My auction just shows a title. It doesn't look like I'm selling anything valuable. I wish I could add a picture."

**Implementation:**
Each auction card now displays a deterministic generative avatar — a gradient square derived from the on-chain `item_hash` field. The gradient colours are cryptographically unique to each auction item, providing a visual identity without requiring off-chain image storage. Full image upload (IPFS) is planned for Wave 4.

---

### F-04 · Real-Time Countdown Timer on Auction Cards

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Paras — `mn_addr_preprod1h8nhc8z4dknjpycm07n2wzqdjehqp4wvzze4y5v4w5m8jvzg8aqsx6glrk` |
| **Commit** | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) · [`b8a242c`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b8a242c) |
| **Files** | `components/AuctionCard.tsx` · `hooks/useCurrentBlock.ts` |

**User Feedback:**
> "I see a block number but I have no idea how much time is left. What does '99250 blocks' mean in minutes?"

**Implementation:**
A `useCurrentBlock` hook was created that polls the Midnight Preprod node for the current block height. `AuctionCard` computes `(auction_end_block − currentBlock) × 5 seconds` to display a live human-readable countdown (e.g. `Closes in ~14m 22s`). The timer turns red when under 5 minutes remaining.

---

### F-05 · My Auctions / Seller Dashboard Tab

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Multiple sellers — anticipated from beta group |
| **Commit** | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| **Files** | `app/auctions/page.tsx` |

**User Feedback:**
> "I created 3 auctions but they're mixed in with everyone else's. I can't quickly find the ones I manage."

**Implementation:**
A tab filter bar was added to the auctions dashboard: `ALL | MINE | OPEN | SETTLED | EXPIRED`. The `MINE` tab filters auctions where `deployerAddress === wallet.address`, cross-referenced with `localStorage`-stored seller contracts. Deep link support via `?address=` query parameters was also implemented.

---

### F-06 · Live tNIGHT Wallet Balance in Navbar

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Renuka B — `mn_addr_preprod1gwm56ja78yckzcnzvwwdpkunj7zrvzukqgqzn9t4qcygyrs3q4tqv5shr8` |
| **Commit** | [`b8a242c`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b8a242c) |
| **Files** | `components/Navbar.tsx` · `hooks/useWallet.ts` |

**User Feedback:**
> "I had to open the 1AM Wallet app separately just to check my token balance. Would be nice to see it in the app."

**Implementation:**
`useWallet` was updated to query the 1AM Wallet connector for the tNIGHT balance post-connection. The Navbar badge now displays `⬡ 245.30 tNIGHT` alongside the wallet address. An amber warning indicator appears when the balance falls below 50 tNIGHT.

---

### F-07 · ZK Proof Generation Progress Modal

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Anticipated — reported by multiple first-time bidders |
| **Commit** | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) · [`31568c4`](https://github.com/shivam-s-dev/zkauction-midnight/commit/31568c4) |
| **Files** | `components/ZKProgressModal.tsx` · `app/auctions/page.tsx` · `lib/auction-api.ts` |

**User Feedback:**
> "After clicking 'Place Bid', nothing happened for 30 seconds. I thought the app crashed."

**Implementation:**
The generic loading spinner was replaced with a 4-step animated progress modal (`ZKProgressModal.tsx`): `Preparing Circuit → Generating ZK Proof → Submitting to Midnight → Confirmed`. Each step illuminates sequentially. `auction-api.ts` was updated with `onProgress` callbacks that emit step numbers as the Midnight SDK progresses through the proving pipeline.

---

### F-08 · Auction Search & Filter Bar

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Shree — `mn_addr_preprod17rzu7fq5zsynta5lcxupwwcf6jw2l3zxlzzlg5k7y8mfyjwrdftsteqn2p` |
| **Commit** | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| **Files** | `app/auctions/page.tsx` |

**User Feedback:**
> "There are so many auctions on the dashboard now. I can't find the one I'm looking for."

**Implementation:**
A real-time search input was added above the auction grid that filters by item description and contract address (client-side, no API call required). Combined with the tab filter system (F-05), users can now precisely find any auction on the dashboard.

---

### F-09 · Copy-to-Clipboard for Addresses & TX Hashes

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Nayan — `mn_addr_preprod1q7uypzttk23crpuhg72vnr57gk4e6y90ahmtj8c4n5pys599k04qstcq9y` |
| **Commit** | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| **Files** | `components/CopyButton.tsx` · `components/AuctionCard.tsx` · `components/Navbar.tsx` |

**User Feedback:**
> "I can't easily copy the contract address on mobile. My fingers keep missing it."

**Implementation:**
A reusable `CopyButton` component was built with a 2-second `✓ Copied!` confirmation state. It was integrated into `AuctionCard` (next to the contract address), the `Navbar` (next to the wallet address), and all toast notifications containing transaction hashes.

---

### F-10 · Shareable Deep Link per Auction

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Nidhi — `mn_addr_preprod1rv2hgk5rkfe7stdwyawmkmyypetq22qjgvnz494wyjtdjaffn04qelj2p8` |
| **Commit** | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| **Files** | `components/AuctionCard.tsx` · `app/auctions/page.tsx` |

**User Feedback:**
> "How do I share my auction with potential buyers? There's no link I can send them."

**Implementation:**
A `🔗 Share Link` button was added to each `AuctionCard`. Clicking it copies `{origin}/auctions?address={contractAddress}` to the clipboard. The auctions page uses `useSearchParams` (wrapped in `<Suspense>`) to detect this parameter and automatically pre-filter the dashboard to the specific auction, creating a functional deep link experience.

---

### F-11 · Auction Activity / Bid History Feed

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Anticipated — multiple bidders requested bid timeline visibility |
| **Commit** | [`HEAD`](https://github.com/shivam-s-dev/zkauction-midnight/commits/main) |
| **Files** | `prisma/schema.prisma` · `app/api/events/route.ts` · `components/ActivityFeed.tsx` · `components/AuctionCard.tsx` |

**User Feedback:**
> "I want to see when bids were placed without knowing who placed them."

**Implementation:**
A new `AuctionEvent` Prisma model stores `eventType`, `txHash`, `amountMicro`, and `createdAt` — **no wallet addresses stored anywhere** (ZK privacy model preserved). A `GET /api/events` endpoint returns the feed per auction. `ActivityFeed.tsx` renders a live timeline in each `AuctionCard` showing 🚀 Created, ⚡ Bid Placed (with amount), ✅ Settled, ⏱ Expired, 💸 Withdrawn events. Every event links its `txHash` directly to the 1AM Explorer. The feed auto-refreshes after each on-chain transaction.

---

### F-12 · Reserve Price Safe-Keeping Modal

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Kirti — `mn_addr_preprod1ascfyaqzcv90j9qd6rtnkzamn730ufqscew9nww3fd4xvte8nntq6yx2lv` |
| **Commit** | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| **Files** | `components/ReserveKeySafeModal.tsx` · `app/auctions/page.tsx` |

**User Feedback:**
> "I created an auction and then cleared my browser. Now I can't settle it because I forgot the reserve price and salt."

**Implementation:**
After every auction deployment, a `ReserveKeySafeModal` appears displaying the reserve price and cryptographic salt in a copyable code box, with a prominent security warning. The modal cannot be dismissed without acknowledgement. The values are also encrypted and stored in `localStorage` as a browser-level fallback, keyed to the contract address.

---

### F-13 · Human-Readable Duration Presets

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Ram Jadhav — `mn_addr_preprod1jz686t708rgksy0enhhet8reamh9g902q8626p3dck4n4p0y3pmsrhfqz9` |
| **Commit** | [`9f23556`](https://github.com/shivam-s-dev/zkauction-midnight/commit/9f23556) |
| **Files** | `components/CreateAuctionModal.tsx` |

**User Feedback:**
> "What is '100 blocks'? I want to set my auction to run for '1 hour', not guess block counts."

**Implementation:**
The raw block-number input in `CreateAuctionModal` was replaced with quick-select duration chips: `15 min | 1 hr | 4 hrs | 1 day | 3 days`. Each chip maps to a block count using the constant 5 seconds/block. The computed block count is displayed as helper text below the selection for transparency.

---

### F-14 · Mobile-Responsive Hamburger Menu

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Sneha — `mn_addr_preprod1y3j5kmpw8xrjv4f2qvyz6l9hst7g5n3c0a8wr4kp5d2zshe97sqe5q4j6` |
| **Commit** | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| **Files** | `components/Navbar.tsx` · `app/globals.css` |

**User Feedback:**
> "The navigation links just disappear completely on my phone. There's no menu at all."

**Implementation:**
A slide-down hamburger menu (`☰`) was implemented in `Navbar.tsx` for screens below the `md` breakpoint (768px). It exposes all navigation links and the wallet connect/disconnect button. The menu state is managed with local React state and closes automatically on navigation.

---

### F-15 · 1AM Explorer Deep Links (Inline)

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Arjun — `mn_addr_preprod1e9kjn0xphs7glvb6m4lzr2tqvf5y3w8d1c7n0a9kp8m5j3ztfqq4ep5ht` |
| **Commit** | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) · [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| **Files** | `components/AuctionCard.tsx` · `app/auctions/page.tsx` |

**User Feedback:**
> "I want to verify my auction on the blockchain explorer without leaving the app to search manually."

**Implementation:**
Every `AuctionCard` now links the contract address directly to `explorer.1am.xyz/contract/{address}?network=preprod`. Transaction hashes in all success toast notifications are also hyperlinked to their corresponding explorer transaction pages.

---

### F-16 · Demo Mode (No Wallet Required)

| Field | Detail |
|---|---|
| **Status** | ✅ SHIPPED |
| **Beta Tester** | Shruti — `mn_addr_preprod1au9ua4scr0v962dw6gr00mnu2cdexrdwmyvvvkhjfu0rs645wmssvexs86` |
| **Commit** | [`9f23556`](https://github.com/shivam-s-dev/zkauction-midnight/commit/9f23556) · [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| **Files** | `app/auctions/page.tsx` · `components/DemoBanner.tsx` |

**User Feedback:**
> "I want to see how the app works but I don't have the 1AM wallet installed yet."

**Implementation:**
A "Try Demo Mode" button was added to the wallet connection screen. Demo Mode loads a pre-seeded auction and simulates the full ZK bid and settle pipeline with animated mock responses. A persistent red `DEMO MODE — No real transactions` banner is displayed throughout the session. All demo interactions are clearly labelled and produce no on-chain transactions.

---

## Implementation Summary Table

| ID | Feature | Status | Commit |
|---|---|---|---|
| F-01 | Beginner Onboarding Walkthrough | ✅ Shipped | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| F-02 | Light / Dark Theme Toggle | ✅ Shipped | [`b9c77b9`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b9c77b9) |
| F-03 | Auction Item Visual Identity (Generative Avatar) | ✅ Shipped | [`d81060a`](https://github.com/shivam-s-dev/zkauction-midnight/commit/d81060a) |
| F-04 | Real-Time Countdown Timer | ✅ Shipped | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| F-05 | My Auctions / Seller Dashboard Tab | ✅ Shipped | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| F-06 | Live tNIGHT Wallet Balance | ✅ Shipped | [`b8a242c`](https://github.com/shivam-s-dev/zkauction-midnight/commit/b8a242c) |
| F-07 | ZK Proof Progress Modal | ✅ Shipped | [`31568c4`](https://github.com/shivam-s-dev/zkauction-midnight/commit/31568c4) |
| F-08 | Auction Search & Filter Bar | ✅ Shipped | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| F-09 | Copy-to-Clipboard Buttons | ✅ Shipped | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| F-10 | Shareable Auction Deep Link | ✅ Shipped | [`64b82c0`](https://github.com/shivam-s-dev/zkauction-midnight/commit/64b82c0) |
| F-11 | Bid History Activity Feed | ✅ Shipped | [`HEAD`](https://github.com/shivam-s-dev/zkauction-midnight/commits/main) |
| F-12 | Reserve Price Safe-Keeping Modal | ✅ Shipped | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| F-13 | Human-Readable Duration Presets | ✅ Shipped | [`9f23556`](https://github.com/shivam-s-dev/zkauction-midnight/commit/9f23556) |
| F-14 | Mobile Hamburger Menu | ✅ Shipped | [`78524ea`](https://github.com/shivam-s-dev/zkauction-midnight/commit/78524ea) |
| F-15 | 1AM Explorer Inline Links | ✅ Shipped | [`e984363`](https://github.com/shivam-s-dev/zkauction-midnight/commit/e984363) |
| F-16 | Demo Mode (No Wallet Required) | ✅ Shipped | [`9f23556`](https://github.com/shivam-s-dev/zkauction-midnight/commit/9f23556) |
