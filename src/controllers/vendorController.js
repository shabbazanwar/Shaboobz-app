import expressAsyncHandler from "express-async-handler";
import Vendor from "../models/vendorModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new Vendor
// @router /api/vendor/
// @access Private

export const createVendor = expressAsyncHandler(async(req, res) => {
    try {
        const newVendor = await Vendor.create(req.body);
        res.status(201).json({ status: true, data: newVendor });
    } catch (error) {
        throw new AppError("Something Went Wrong", 400);
    }
});