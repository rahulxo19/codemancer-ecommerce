// src/services/email.service.ts

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendCheckoutEmail = async (email: string, cart: any) => {
  // Construct the email content
  const emailContent = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your purchase!</p>
    <p>Order Summary:</p>
    <ul>
      ${cart.items
        .map(
          (item: any) => `
        <li>Product: ${item.productId} - Quantity: ${item.quantity}</li>
      `
        )
        .join("")}
    </ul>
    <p>Shipping Address: ${cart.shippingAddress}</p>
    <p>Thank you for shopping with us!</p>
  `;

  // Send the email
  await transporter.sendMail({
    from: '"Your Shop" <no-reply@yourshop.com>', // Sender address
    to: email, // List of recipients
    subject: "Order Confirmation", // Subject line
    html: emailContent, // HTML body content
  });
};

export default sendCheckoutEmail;
