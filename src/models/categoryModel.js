import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
    },
    description: String,
    parentCategory:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
    },
    subCategory: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Category",
        },
    ],
  },
 { timestamps: true },  // automatically adds createdAt and updatedAt fields
);

export const Category = mongoose.model("Category", categorySchema);