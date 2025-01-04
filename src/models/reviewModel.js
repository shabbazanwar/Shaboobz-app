import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: number,
        required: true,
        min: 1, 
        max: 5,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
 },
 { timestamps: true },  // automatically adds createdAt and updatedAt fields
);

export const Review = mongoose.model("Review", reviewSchema);