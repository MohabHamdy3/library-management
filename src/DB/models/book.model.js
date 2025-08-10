import mongoose from "mongoose";



const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
    timestamps: true,
});

const bookModel = mongoose.model.book || mongoose.model("book", bookSchema);

export default bookModel;

bookModel.syncIndexes();