import mongoose from "mongoose";

export const transactionStatuses = {
    BORROWED : "borrowed",
    RETURNED : "returned"
}

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: Object.values(transactionStatuses)
  },
},
{
    timestamps: true,
});

const transactionModel = mongoose.model.transaction || mongoose.model("transaction", transactionSchema);

export default transactionModel;

transactionModel.syncIndexes();