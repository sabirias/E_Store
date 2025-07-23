import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      maxlength: [1000, "Comment cannot be more than 1000 characters"],
    },
    images: [
      {
        type: String,
      },
    ],
    helpful: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        helpful: {
          type: Boolean,
          default: true,
        },
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one review per user per product per order
reviewSchema.index({ user: 1, product: 1, order: 1 }, { unique: true });

// Update product rating when review is created/updated/deleted
reviewSchema.post("save", async function () {
  await this.constructor.updateProductRating(this.product);
});

reviewSchema.post("findOneAndUpdate", async function () {
  if (this.product) {
    await this.constructor.updateProductRating(this.product);
  }
});

reviewSchema.post("findOneAndDelete", async function () {
  if (this.product) {
    await this.constructor.updateProductRating(this.product);
  }
});

// Static method to update product rating
reviewSchema.statics.updateProductRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: {
        product: productId,
        isActive: true,
      },
    },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      "rating.average": Math.round(stats[0].avgRating * 10) / 10,
      "rating.count": stats[0].numReviews,
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      "rating.average": 0,
      "rating.count": 0,
    });
  }
};

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
