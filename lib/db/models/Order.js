import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: "United States",
      },
      phone: {
        type: String,
        required: true,
      },
    },
    billingAddress: {
      name: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: "United States",
      },
    },
    trackingNumber: {
      type: String,
    },
    trackingUrl: {
      type: String,
    },
    estimatedDelivery: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot be more than 500 characters"],
    },
    couponCode: {
      type: String,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number
orderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Get count of orders for today
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await this.constructor.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    this.orderNumber = `ORD${year}${month}${day}${(count + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

// Virtual for order status color
orderSchema.virtual("statusColor").get(function () {
  const colors = {
    pending: "yellow",
    processing: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
    refunded: "gray",
  };
  return colors[this.status] || "gray";
});

// Ensure virtual fields are serialized
orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
