import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Order from "./models/Order.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/checkout_db";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST /api/orders  -> save { form, cart, shippingMethod, total } as one document
app.post("/api/orders", async (req, res) => {
  try {
    const { form, cart, shippingMethod, total } = req.body;

    if (!form || !cart || !shippingMethod || total === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await Order.create({ form, cart, shippingMethod, total });
    res.status(201).json({ message: "Order saved", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
