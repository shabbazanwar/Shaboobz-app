import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
 },
 { _id: false, },
);

const supportSchema = new mongoose.Schema({
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
    subject: {
        type: String,
        required: true,
    },
    message: [messageSchema],
    status: {
        type: String,
        enum: ["Open", "in_progress", "Closed"],
        default: "Open",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
    },
    category: String,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    assignedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

supportSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Support = mongoose.model("Support", supportSchema);
