import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    images: [
      {
        type: String,
        required: [true, "At least one product image is required"],
      },
    ],
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["electronics", "clothing", "books", "home-garden"],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    specifications: {
      type: Map,
      of: String,
    },
    variants: [
      {
        name: String,
        options: [String],
        price: Number,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    discount: {
      percentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      validUntil: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  brand: "text",
  tags: "text",
});

// Virtual for discounted price
productSchema.virtual("discountedPrice").get(function () {
  if (
    this.discount &&
    this.discount.percentage > 0 &&
    (!this.discount.validUntil || this.discount.validUntil > new Date())
  ) {
    return this.price * (1 - this.discount.percentage / 100);
  }
  return this.price;
});

// Virtual for in stock status
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});

// Ensure virtual fields are serialized
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
