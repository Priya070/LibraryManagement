const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//list of books with details like title, author, publication year, and availability status.
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    author: {
        type: String,
        trim: true,
        minlength: 0,
        maxlength: 20,
    },
    publicationYear: {
        type: Number,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'not available'],
        default: 'available',
    },
});
    
export default mongoose.model('Books', BookSchema);