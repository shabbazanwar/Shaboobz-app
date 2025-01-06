import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import { AppError } from "../middlewares/errorHandler.js"



// @desc Register a new user
// @router /api/user/register
// @access Public


export const registerUser = expressAsyncHandler (async(req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body);
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new AppError("User already exists");
        }
        
        const user = await User.create({ 
            name, 
            email, 
            password, 
        });
        if (user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }else{
            throw new AppError("Invalid User Data", 400);
        }
});

// @desc Register a new user
// @router /api/user/register
// @access Public

export const loginUser = expressAsyncHandler(async(req, res) => {
    const { email, password } = req.body;
    // first find if the user exists

    const user = await User.findOne({ email });
    if (userExists && (await userExists.comparepassword(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        throw new AppError ("Invalid Email or Password")
    }
});

// @desc get a user Profile
// @router /api/user/Profile
// @access Private

export const profile = expressAsyncHandler(async(req, res, next) => {
    const { _id } = req.body;
    // first we find if the user already exists
    const user = await User.findById( _id );
    if (user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            isActive: user.isActive,
        });
    }else {
        throw new AppError("User Now Found");
    }
});


// @desc Update a user profile
// @router /api/user/profile
// @access Private


export const updateProfile = expressAsyncHandler(async(req, res) => {
    const { _id } = req.user;
    // first we find if the user already exists
    const user = await User.findById( _id );
    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
        user.address = req.body.address || user.address;
        user.phone = req.body.phone || user.phone;

        const updateUser = await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            isActive: user.isActive,
            address: user.address,
        });
    }else {
        throw new AppError("User Now Found");
    }
});
// @desc Get all user profile
// @router /api/user
// @access Private


export const getAllProfile = expressAsyncHandler(async(req, res) => {
    // first we find if the user already exists
    const users = await User.find();
    if (users){
        res.json(users);
    }else {
        throw new AppError("User Now Found");
    }
});

// @desc Delete user profile
// @router /api/user
// @access Private


export const deleteUserProfile = expressAsyncHandler(async(req, res) => {
    try {
      // first we find if the user already exists
        await User.findAndDelete(req.params.id);
        res.json({ message: "User Removed"})
    } catch (error) {
        throw new AppError("User Now Found");
    }
 });