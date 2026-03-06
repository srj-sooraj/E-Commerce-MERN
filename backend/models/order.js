import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        name: String,       // snapshot
        price: Number,      // snapshot
        image: String,      // snapshot
        quantity: Number
      }
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      postalCode: String
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending"
    },

    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing"
    }
  },
  { timestamps: true }
);

// export default mongoose.model("Order", orderSchema);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);