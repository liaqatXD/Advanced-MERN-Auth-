import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./db/connect_db.js"; // importing the function
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app=express();

//in order to parse json body
app.use(express.json());

//in order to parse cookies
app.use(cookieParser());

const PORT=process.env.PORT || 8000;
    app.listen(PORT,()=>{
	    connectDb();
        console.log(`listening on port ${PORT}`);
    });

app.use("/api/auth",authRoutes);