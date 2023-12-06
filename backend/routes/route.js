// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getBooks,
    reserveBook,
    getUserProfile,
    getReservedBooks,
    // Add other functions for managing books and user accounts
} = require('./models');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/books', getBooks);
router.post('/reserve', reserveBook);
router.get('/profile', getUserProfile);
router.get('/reserved-books', getReservedBooks);
// Add other routes for managing books and user accounts

module.exports = router;
