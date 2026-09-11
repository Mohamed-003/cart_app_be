# Checkout App — Backend

A simple Express + MongoDB (Mongoose) API that stores checkout orders — shipping/payment form data, cart items, shipping method, and total — as a single document per order.

## Tech Stack

- Node.js (ESM)
- Express
- MongoDB + Mongoose
- CORS
- dotenv

## Prerequisites

- Node.js 18+
- A running MongoDB instance — either:
  - Local MongoDB (`mongod` running on `localhost:27017`), or
  - A MongoDB Atlas cluster (cloud, free tier available)

  > MongoDB creates the database and collection automatically on first write — no manual DB creation needed.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example file and edit as needed:

   ```bash
   cp .env.example .env
   ```

   `.env`:

   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/checkout_db
   ```

   For MongoDB Atlas, replace `MONGO_URI` with your connection string from **Atlas → Database → Connect → Drivers**. If you hit `querySrv ECONNREFUSED` errors with an `mongodb+srv://` string, try the standard (non-SRV) connection string instead, or check your network/DNS settings.

## Run

```bash
# production
npm start

# development (auto-restarts on file changes)
npm run dev
```

Server runs at `http://localhost:5000` by default.

## API Endpoints

### `POST /api/orders`

Creates a new order document.

**Request body:**
```json
{
  "form": {
    "firstName": "Divyansh",
    "lastName": "Agarwal",
    "email": "divyansh@webyansh.com",
    "phoneCode": "IND",
    "phone": "6377588843",
    "city": "Bangalore",
    "state": "Karnataka",
    "zip": "560021",
    "cardName": "John Doe",
    "cardNumber": "1234 5678 9012 3456",
    "expiry": "12/28",
    "cvc": "123"
  },
  "cart": [
    { "id": 1, "name": "Men Top Black Puffed Jacket", "variant": "Men's Black", "price": 999, "qty": 1 },
    { "id": 2, "name": "Women Jacket", "variant": "Women top", "price": 1200, "qty": 1 }
  ],
  "shippingMethod": "free",
  "total": 2199
}
```

**Responses:**
- `201 Created` — `{ "message": "Order saved", "order": { ... } }`
- `400 Bad Request` — missing required fields
- `500 Internal Server Error` — database or server error

### `GET /api/orders`

Returns all saved orders, newest first.

**Response:** `200 OK` — array of order documents.

## Data Model (`Order`)

| Field | Type |
|---|---|
| `form` | Object (shipping + payment fields) |
| `cart` | Array of `{ id, name, variant, price, qty }` |
| `shippingMethod` | String |
| `total` | Number |
| `createdAt` / `updatedAt` | Auto-generated timestamps |

## Security Note

This is a minimal demo. It currently stores card number and CVC as plain text, which is **not safe for production**. Real payment details must never touch your own database — integrate a PCI-compliant payment processor (e.g. Stripe, Razorpay) and store only a tokenized reference instead. This backend also has no authentication, rate limiting, or input sanitization beyond basic presence checks — add those before deploying anywhere public.