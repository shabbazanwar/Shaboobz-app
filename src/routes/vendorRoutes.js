import express from "express";

const vendorRouter = express.Router();

// Create a Vendor route

vendorRouter.post("/", protect)

export default vendorRouter;