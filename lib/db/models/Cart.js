import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    max: [99, "Quantity cannot exceed 99"],
  },
  price: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    couponCode: {
      type: String,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for cart total
cartSchema.virtual("subtotal").get(function () {
  return this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

// Virtual for cart total with discount
cartSchema.virtual("total").get(function () {
  const subtotal = this.subtotal;
  return Math.max(0, subtotal - this.couponDiscount);
});

// Virtual for item count
cartSchema.virtual("itemCount").get(function () {
  return this.items.reduce((count, item) => count + item.quantity, 0);
});

// Ensure virtual fields are serialized
cartSchema.set("toJSON", { virtuals: true });
cartSchema.set("toObject", { virtuals: true });

// Update lastUpdated when items change
cartSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = async function (productId, quantity = 1, price) {
  const existingItem = this.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = price; // Update price in case it changed
  } else {
    this.items.push({
      product: productId,
      quantity,
      price,
    });
  }

  return await this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = async function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );
  return await this.save();
};

// Method to update item quantity
cartSchema.methods.updateQuantity = async function (productId, quantity) {
  const item = this.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (item) {
    if (quantity <= 0) {
      return await this.removeItem(productId);
    }
    item.quantity = quantity;
    return await this.save();
  }

  throw new Error("Item not found in cart");
};

// Method to clear cart
cartSchema.methods.clearCart = async function () {
  this.items = [];
  this.couponCode = null;
  this.couponDiscount = 0;
  return await this.save();
};

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
