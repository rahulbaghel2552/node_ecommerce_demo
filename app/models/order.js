const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    items: {
      type: Object,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    paymentType: {
      type: String,
      default:'COD'
    },
    status: {
        type: String,
        default:'order_placed'
      },
  },
  { timestamps: true }  
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
