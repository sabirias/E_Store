import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth/auth";
import connectDB from "../../../lib/db/connect";
import Cart from "../../../lib/db/models/Cart";
import Product from "../../../lib/db/models/Product";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let cart = await Cart.findOne({ user: session.user.id })
      .populate("items.product", "name price images stock sku")
      .lean();

    if (!cart) {
      cart = { items: [], subtotal: 0, total: 0, itemCount: 0 };
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Get Cart API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { productId, quantity = 1 } = await request.json();

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      cart = new Cart({ user: session.user.id, items: [] });
    }

    // Add item to cart
    await cart.addItem(productId, quantity, product.price);

    // Populate product details
    await cart.populate("items.product", "name price images stock sku");

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Add to Cart API Error:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { productId, quantity } = await request.json();

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Check stock
    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    await cart.updateQuantity(productId, quantity);
    await cart.populate("items.product", "name price images stock sku");

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Update Cart API Error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (productId) {
      // Remove specific item
      await cart.removeItem(productId);
    } else {
      // Clear entire cart
      await cart.clearCart();
    }

    await cart.populate("items.product", "name price images stock sku");

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Delete Cart API Error:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
