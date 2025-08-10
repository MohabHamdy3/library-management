
import bookModel from './../../DB/models/book.model.js';



export const addBook = async (req, res, next) => {
    const { title, author, publishedYear, availableCopies } = req.body;
    if (!title || !author || !publishedYear || !availableCopies) {
        throw new Error("All fields are required" , {
            cause: 404,
        });
    }
    const newBook = await bookModel.create({
        title,
        author,
        publishedYear,
        availableCopies
    });
    res.status(201).json({ message: "Book added successfully", book: newBook });
}

export const getAllBooks = async (req, res, next) => {
    const books = await bookModel.find();
    res.status(200).json({ message: "Books retrieved successfully", books });
};

export const updateBook = async (req, res, next) => {
    const { id } = req.params;
    const { title, author, publishedYear, availableCopies } = req.body;

    const updatedBook = await bookModel.findByIdAndUpdate(id, {
        title,
        author,
        publishedYear,
        availableCopies
    }, { new: true });

    if (!updatedBook) {
        throw new Error("Book not found", {
            cause: 404,
        });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });

}

export const deleteBook = async (req, res, next) => {
    const { id } = req.params;
    const deletedBook = await bookModel.findByIdAndDelete(id);
    if (!deletedBook) {
        throw new Error("Book not found", {
            cause: 404,
        });
    }
    res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
}