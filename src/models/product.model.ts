import { Schema, model, Document } from "mongoose";

interface Product extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export default model<Product>("Product", productSchema);
