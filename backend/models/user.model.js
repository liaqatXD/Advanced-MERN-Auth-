import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'username is required'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date

},{timestamps:true});

export const User=mongoose.model('User',userSchema);