import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./db/connect_db.js"; // importing the function
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//Enabling cors for frontend
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5174"],
    credentials: true,
  })
);

//in order to parse json body
app.use(express.json());

//in order to parse cookies
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDb();
  console.log(`listening on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
