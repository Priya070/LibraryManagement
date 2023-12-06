// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';
mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use routes
app.use('/api/auth', auth);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
