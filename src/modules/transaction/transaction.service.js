import bookModel from "../../DB/models/book.model.js";
import transactionModel, { transactionStatuses } from "../../DB/models/transaction.model.js";
import userModel from "../../DB/models/user.model.js";



export const borrowBook = async (req , res , next) => {
    const { userId, bookId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const book = await bookModel.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const transaction = await transactionModel.create({
        userId,
        bookId,
        status: transactionStatuses.BORROWED
    });
    book.availableCopies -= 1;
    await book.save();
    res.status(201).json({ message: "Book borrowed successfully", transaction });
}


export const returnBook = async (req, res, next) => {
    const { userId, bookId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const book = await bookModel.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const transaction = await transactionModel.findOneAndUpdate(
        { userId, bookId, status: transactionStatuses.BORROWED },
        { status: transactionStatuses.RETURNED },
        { new: true }
    );

    if (!transaction) {
        return res.status(404).json({ message: "Transaction not found or already returned" });
    }

    book.availableCopies += 1;
    await book.save();
    
    res.status(200).json({ message: "Book returned successfully", transaction });
}

export const getTransactionHistory = async (req, res, next) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const transactions = await transactionModel.find({ userId });
    res.status(200).json({ message: "Transaction history retrieved successfully", transactions });
}
