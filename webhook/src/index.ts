import { verifyWebhookSignature } from "@candypay/checkout-sdk";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { cashback } from "./cashback";
import axios from "axios";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;


app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

app.post("/", async (req: Request, res: Response) => {
  const headers = req.headers;
  const payload = req.body;
  console.log("Payload data:", payload); 

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

    // Handle the event if it's a successful transaction
    if (payload.event === 'transaction.successful') {
      try {
        cashback(payload.customer, payload.payment_amount); // cashback function
        // Transfers token to customer address based on amount spent for a payment 
      } catch (error) {
        console.error("Error processing cashback:", error);
        
        return res.status(500).json({
          message: "Error processing cashback!",
        });
      }
    }  

   // store txn to verxio database
   try {
    const url = `https://backend-verxio.vercel.app/api/v1/payment/mail`;
    
    const response = await axios.post(url, payload);

    if (response.data.success === true) {
      console.log('Payload saved successfully:', response.data.message);

    } else {
      console.error('Failed to save payload:', response.data.message);
    }
  } catch (error) {
    console.error("Error storing payload:", error);
  }

  return res.status(200).json({
    message: "Cashback done, cheers!",
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
