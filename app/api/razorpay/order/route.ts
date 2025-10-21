import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt } = body;

    console.log("Received request to create order:", { amount, currency, receipt });
    console.log("Razorpay Key ID loaded?", !!process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret loaded?", !!process.env.RAZORPAY_KEY_SECRET);

    if (!amount || !receipt) {
      return NextResponse.json(
        { success: false, message: "Amount and receipt are required" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
    };

    console.log("Creating order with options:", options);

    const order = await razorpay.orders.create(options);

    console.log("Order created successfully:", order);

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.description || error?.message || "Something went wrong while creating order",
      },
      { status: 500 }
    );
  }
}
