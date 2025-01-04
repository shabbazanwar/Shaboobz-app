import mongoose from 'mongoose';


const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color: String,
  size: String,
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }, 
 },
 { _id: false, timestamps: true }
);
 
const cancellationSchema = new mongoose.Schema({
  reason: {
    type: string,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
 },
 { _id: false }
);

const returnSchema = new mongoose.Schema({
  reason: {
    type: string,
    required: true,
  },
  status: {
    type: string,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
 },
 { _id: false }
);

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: {orderItemSchema},
  totalPrice: {
    type: string,
    required: true,
  },
  status: {
    type: string,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancalled"],
    default: "pending",
  },
  address: {
    street: string,
    city: string,
    zip: string,
    state: string,
    country: string,
  },
  paymentMethod: {
    type: string,
    enum: ["Card", "Paypal", "cash_on_delivery"]
  },
  cancellation: cancellationSchema,
  return: returnSchema,
 }, 
 { timestamps: true },  // automatically adds createdAt and updatedAt fields
);

export const Order = mongoose.model('Order', orderSchema);
