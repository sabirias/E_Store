import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connect";

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // In a real application, you would save this to a database
    // and integrate with an email service like Mailchimp, SendGrid, etc.

    // For now, we'll just log the subscription
    console.log("Newsletter subscription:", email);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      message: "Successfully subscribed to newsletter",
      email: email,
    });
  } catch (error) {
    console.error("Newsletter Subscription API Error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
