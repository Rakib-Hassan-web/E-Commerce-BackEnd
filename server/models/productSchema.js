const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
  
        {
            type: String
        }
    ],
    thumbnail: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    isActive: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


module.exports = mongoose.model("product", productSchema)