import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { 
//     dbConnect } from "./src/utils/utils.js";  // Database connection setup
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { notFoundErrorHandler } from "./src/middlewares/errorHandler.js";
import  userRouter  from "./src/routes/userRoutes.js";
import { dbConnect } from "./src/utils/utils.js";


// Load Environment Variables from.env file
dotenv.config();

// connection to mongodb
dbConnect();

// initialize express app
const app = express();

// Middleware Setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Api routes
app.use("/api/user", userRouter);


// Error Handler Middlewares
app.use(errorHandler);
app.use(notFoundErrorHandler);


// starting the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
