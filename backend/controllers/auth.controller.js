import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { generateResetToken } from "../utils/generateResetToken.js";
import { sendWelcomeEmail, sendVerificationEmail, sendResetPasswordEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw new Error('All fields are required!');
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('This email is taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({ name, email, password: hashedPassword, verificationToken, verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000 });
        await user.save();

        //generating token and sending cookie
        generateTokenAndSetCookie(res, user._id);

        //sending mail
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true, message: "user created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });


    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


export const verifyEmail = async (req, res) => {
    const { verificationCode } = req.body;
    try {
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } });
        if (user) {
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();
            await sendWelcomeEmail(user.name, user.email);
            res.status(200).json({ success: true, message: "user email verified successfully" });
        }
        else throw new Error('Invalid or expired verification code');
    } catch (error) {
        console.log("error verifying user", error)
        res.status(400).json({ success: false, message: error.message })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: 'invalid credentials' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ success: false, message: 'invalid credentials' });
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({ success: true, message: 'user logged in successfully!' });
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ success: false, message: 'user login failed ' + error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "user logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("invalid email");
        //generating reset token
        const resetToken = generateResetToken();
        user.resetPasswordToken = await bcrypt.hash(resetToken, 10);
        user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; //1 hour validity 
        await user.save();
        await sendResetPasswordEmail(email, resetToken);
        res.status(200).json({ success: true, message: "password reset link sent successfully." });


    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }

}