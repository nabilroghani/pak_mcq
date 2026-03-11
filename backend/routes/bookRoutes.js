const express = require("express");
const router = express.Router();
const { getBooks, addBook, deleteBook, updateBook } = require("../controllers/bookController"); 
const { protect, isAdmin } = require("../middleware/auth"); 

router.get("/all", getBooks);
router.post("/add", protect, isAdmin, addBook); 
router.delete("/delete/:id", protect, isAdmin, deleteBook);
router.put("/update/:id", protect, isAdmin, updateBook);

module.exports = router;