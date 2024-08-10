import { Schema, model, Document } from "mongoose";

interface CartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

interface Cart extends Document {
  email: Schema.Types.ObjectId;
  items: CartItem[];
  shippingAddress?: string;
  isCheckedOut: boolean;
}

const cartSchema = new Schema<Cart>({
  email: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: { type: String },
  isCheckedOut: { type: Boolean, default: false },
});

export default model<Cart>("Cart", cartSchema);
