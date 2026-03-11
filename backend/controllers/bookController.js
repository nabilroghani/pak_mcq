const Book = require("../models/Book");

// 1. Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, category, size, driveId, color } = req.body;
    const newBook = new Book({ title, author, category, size, driveId, color });
    await newBook.save();
    res.status(201).json({ success: true, message: "Book added successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Update an existing book (Naya Function)
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, size, driveId, color } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, category, size, driveId, color },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found!" });
    }

    res.status(200).json({ success: true, message: "Book updated successfully!", data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found!" });
    }

    res.status(200).json({ success: true, message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook, 
  deleteBook
};