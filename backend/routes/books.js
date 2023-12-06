const router = require('express').Router();
const Book = require('../models/book');
const User = require('../models/user');
const fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the books
//Admin and user can view all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE 2: Add a new book
//Admin can add a new book
router.post(
    '/newBook',
    fetchUser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('author', 'Enter a valid author').isLength({ min: 3 }),
        body('publicationYear', 'Enter a valid publication year').isLength({
            min: 4,
            max: 4,
        }),
        body('availabilityStatus', 'Enter a valid availability status'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const { title, author, publicationYear } = req.body;
            const book = new Book({
                title,
                author,
                publicationYear,
                availabilityStatus: 'available',
            });
            const newBook = await book.save();
            res.status(201).json(newBook);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// ROUTE 3: Update a book
//Admin can update a book
router.patch('/updatedBooks/:id', fetchUser, async (req, res) => {
    try {
        const { title, author, publicationYear, availabilityStatus } = req.body;
        const updatedBook = {};
        if (title) updatedBook.title = title;
        if (author) updatedBook.author = author;
        if (publicationYear) updatedBook.publicationYear = publicationYear;
        if (availabilityStatus) updatedBook.availabilityStatus = availabilityStatus;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const updatedBookData = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: updatedBook },
            { new: true }
        );
        res.json(updatedBookData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE 4: Delete a book
//Admin can delete a book
router.delete('/deleteBooks/:id', fetchUser, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await book.remove();
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE 5: Issue a book
//User can issue a book
router.patch('/issueBooks/:id', fetchUser, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.availabilityStatus === 'not available') {
            return res.status(400).json({ message: 'Book is not available' });
        }
        const updatedBookData = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: { availabilityStatus: 'not available' } },
            { new: true }
        );
        res.json(updatedBookData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE 6: Return a book
//User can return a book
router.patch('/returnBooks/:id', fetchUser, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // if (book.availabilityStatus === 'available') {
        //     return res.status(400).json({ message: 'Book is already available' });
        // }
        const updatedBookData = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: { availabilityStatus: 'available' } },
            { new: true }
        );
        res.json(updatedBookData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE 7: Get all the users
//Admin can view all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

