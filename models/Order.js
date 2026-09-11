import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    variant: String,
    price: Number,
    qty: Number,
  },
  { _id: false }
);

const FormSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneCode: String,
    phone: String,
    city: String,
    state: String,
    zip: String,
    cardName: String,
    cardNumber: String,
    expiry: String,
    cvc: String,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    form: FormSchema,
    cart: [CartItemSchema],
    shippingMethod: String,
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
