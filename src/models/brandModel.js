import mongoose from 'mongoose';
const brandSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: String,
    logo: String,
 },
 { timestamps: true },  // automatically adds createdAt and updatedAt fields
);

export const Brand = mongoose.model('Brand', brandSchema);