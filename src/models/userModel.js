import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
  
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,

  },
  password: { 
    type: String, 
    required: true,

  },
  studentID: { 
    type: String, 
    required: true, 

  },
  role: { 
    type: String, 
    enum: ["user", "vendor", "admin"], 
    default: "user",
  },
  address: { 
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  phone: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  }, 
 },
 { timestamps:true } 
);

// Password hashing before saving user
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare provided password with stored hash
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// module.exports = mongoose.model('User', userSchema);
export const User = mongoose.model("User", userSchema);