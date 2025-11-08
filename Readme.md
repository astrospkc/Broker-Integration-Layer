# Broker Integration Layer

This module provides a unified way to integrate third-party stock brokers (such as Zerodha, Groww, etc.) into your platform. It allows users to connect their broker accounts and fetch their portfolio, trade history, and other investment data in a normalized format.

<!-- ## Overview

Many trading platforms expose their own APIs and data formats. The goal of the broker integration layer is to abstract these differences and provide a consistent set of data models and functions regardless of the broker being used. -->

### Key Design Decisions

- The user must already have an account with a supported broker (e.g., Zerodha, Groww, etc.).
- When connecting a broker, the user selects their broker type and is redirected to the respective broker login/authorization page.
- Upon successful authorization, relevant authentication credentials (such as access tokens, refresh tokens, etc.) are stored in the user's **broker profile**.
- Each broker returns trade/portfolio data in different formats. We identify common fields across brokers and normalize the data to a **common trade schema**.

### Data Normalization Strategy

1. Fetch raw trade/portfolio data from the broker API.
2. Identify common fields present across different brokers.
3. Map broker-specific field names to the **common normalized model**.
4. Store normalized data in the system for easy processing, analytics, and UI display.

---

## Supported Brokers

| Broker  | Login Flow | Portfolio | Trades    | Notes         |
| ------- | ---------- | --------- | --------- | ------------- |
| Zerodha | Yes        | Yes       | Yes       | Implemented ✅ |
| Groww   | Unplanned  | Unplanned | Unplanned | Coming soon 🚧 |

---

## Developer Setup

### Prerequisites (for Zerodha integration)

Set the following environment variables:

```bash
ZERODHA_BROKER_API_KEY=<your_key_here>
ZERODHA_BROKER_SECRET_KEY=<your_secret_here>
JWT_SECRET=<your_secret>
MONGODB_URI=<your_mongo_uri>
```

### Installation

Make sure TypeScript is set up in your project:

```bash
npm install 
```

Right now, there is **fake trade api**, to show that how the normalized data will look like (I didn't have trade details so fake trade api from zerodha)