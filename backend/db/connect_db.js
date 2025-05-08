import mongoose from "mongoose";

const connectDb=async ()=>{
    try {
      const conn= await mongoose.connect(process.env.MONGO_URI);
       console.log("connecting with DB successfully");
    } catch (error) {
     console.log('Error connecting with DB',error.message);   
     process.exit(1);
    }
}

export default connectDb;