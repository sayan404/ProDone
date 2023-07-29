const mongoose = require('mongoose')

const specialOfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description'],
    },
    category: {
        type: String,
        required: [true, 'Please Enter Product Category'],
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SpecialOffers', specialOfferSchema)