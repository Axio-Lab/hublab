import { verifyWebhookSignature } from "@candypay/checkout-sdk";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { cashback } from "./cashback";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

app.post("/", async (req: Request, res: Response) => {
  const headers = req.headers;
  const payload = req.body;
  console.log("Payload data:", payload); // complete payment data

  try {
    await verifyWebhookSignature({
      payload: JSON.stringify(payload),
      headers: headers as Record<string, string>,
      webhook_secret: process.env.WEBHOOK_SECRET!,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Invalid webhook signature",
    });
  }

  cashback(payload.customer, payload.payment_amount); // cashback function
  // transfers token to customer address based on amount spent for a payment

  return res.status(200).json({
    message: "Cashback done, cheers!",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
