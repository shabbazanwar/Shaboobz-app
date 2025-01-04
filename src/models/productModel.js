import mongoose from 'mongoose';

const productVariationSchema = new mongoose.Schema({
  color: String,
  size: String,
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  price: { 
    type: Number,
    required: true,
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
  },
  description: String, 
  vendor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor', 
    required: true,
  },
  price: { 
    type: Number, 
    required: true 

  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true, 

  },
  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true, 

  },
  brand: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Brand', 
    required: true,
  },
  image: [String],
  variations: [ productVariationSchema],
  ratingAverage: {
    type: Number,
    default: 0,
  },
  ratingQuantity: {
    type: Number,
    default: 0,

  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
 },
 { timestamps: true }
);


export const Product = mongoose.model("Product", productSchema);
