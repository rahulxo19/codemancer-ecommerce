import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import sendCheckoutEmail from "../services/email.service";

interface UserPayload {
  email: string;
  role: "user" | "superadmin";
}

interface req extends Request {
  user?: UserPayload;
}

export const addToCart = async (req: req, res: Response) => {
  const { productId, quantity } = req.body;
  const email = req.user?.email;

  try {
    let cart = await Cart.findOne({ email, isCheckedOut: false });
    if (!cart) {
      cart = new Cart({ email, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const viewCart = async (req: req, res: Response) => {
  const email = req.user?.email;

  try {
    const cart = await Cart.findOne({ email, isCheckedOut: false }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const checkoutCart = async (req: req, res: Response) => {
  const email = req.user?.email;
  const { shippingAddress } = req.body;

  try {
    if (!email && !req.user) {
      return res.status(401).json({ message: "relogin" });
    }
    let cart = await Cart.findOne({ email, isCheckedOut: false });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.shippingAddress = shippingAddress;
    cart.isCheckedOut = true;
    await cart.save();

    // Send confirmation email
    if (email) {
      await sendCheckoutEmail(email, cart);
    }

    res.json({ message: "Checkout successful", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
