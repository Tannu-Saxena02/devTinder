const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    
        required: true,
    },
    paymentId:{
        type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    notes: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      memberShipType: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
