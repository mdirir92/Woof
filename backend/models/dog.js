const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DogSchema = new Schema(
    {
        url: {type: String, required: true, maxLength: 254},
        breed: {type: String, required: true, maxLength: 100},
        rating: {type: Number},
    }
);

module.exports = mongoose.model('Dog', DogSchema);
