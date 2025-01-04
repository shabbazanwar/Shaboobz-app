import mongoose from 'mongoose';
const wishlistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
 },
 { timestamps: true },  // automatically adds createdAt and updatedAt fields
);


export const Wishlist = mongoose.model("Wishlist", wishlistSchema);