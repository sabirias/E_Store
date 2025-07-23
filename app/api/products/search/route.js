import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connect";
import Product from "../../../../lib/db/models/Product";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit")) || 5;

    if (!q || q.trim().length < 2) {
      return NextResponse.json({ products: [] });
    }

    const products = await Product.find({
      $text: { $search: q },
      isActive: true,
    })
      .limit(limit)
      .select("_id name price images category rating")
      .lean();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product Search API Error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
