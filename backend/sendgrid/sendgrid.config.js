import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const sender = process.env.EMAIL_USER;

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const msg = {
      to: email,
      from: sender,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
    };
    await sgMail.send(msg);
    console.log("verification email sent!");
  } catch (error) {
    console.log(`email verification failed, ${error}`);
    throw new Error(error);
  }
};

export const sendWelcomeEmail = async (name, email) => {
  try {
    const msg = {
      to: email,
      from: sender,
      subject: "Email Verified Successfully",
      html: WELCOME_TEMPLATE.replace("{name}", name),
    };
    await sgMail.send(msg);
  } catch (error) {
    console.log(`error while sending welcome email, ${error}`);
    throw new Error(error);
  }
};

export const sendResetPasswordEmail = async (email, token) => {
  try {
    const msg = {
      to: email,
      from: sender,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        `${process.env.CLIENT_URL}/reset-password/${token}`
      ),
    };
    await sgMail.send(msg);
    console.log("password reset email sent successfully");
  } catch (error) {
    console.log("Error sending reset email", error.message);
    throw new Error(error);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  try {
    const msg = {
      to: email,
      from: sender,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };
    await sgMail.send(msg);
    console.log("password reset success email sent successfully");
  } catch (error) {
    console.log(
      "Error while sending reset password success email",
      error.message
    );
    throw new Error(error);
  }
};
