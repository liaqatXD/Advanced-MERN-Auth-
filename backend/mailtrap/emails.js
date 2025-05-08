import { mailtrapClient, sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplates.js";
export const sendVerificationEmail = async (email, verificationCode) => {

  try {
    await mailtrapClient
      .send({
        from: sender,
        to: [{ email }],
        subject: "Verify Your Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
        category: "Email verification",
      });
  } catch (error) {
    console.log(`email verification failed, ${error}`);
    throw new Error(error);
  }
}

export const sendWelcomeEmail = async (name, email) => {
  try {
    await mailtrapClient
      .send({
        from: sender,
        to: [{ email }],
        subject: "Verify Your Email",
        template_uuid: "e440aeae-9569-4c7c-8664-27d9b28cdbab",
        template_variables: {
          "company_info_name": "Shrekrick",
          "name": name
        }
      });
  } catch (error) {
    console.log(`error while sending welcome email, ${error}`);
    throw new Error(error);
  }

}

export const sendResetPasswordEmail = async (email, token) => {
  try {
    const res = await mailtrapClient
      .send({
        from: sender,
        to: [{ email }],
        subject: "Reset Your Password",
        //react app url
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', `${process.env.CLIENT_URL}/reset-password/${token}`),
        category: "Reset password"
      });
    console.log('password reset email sent successfully', res);
  } catch (error) {
    console.log("Error sending reset email", error.message);
    throw new Error(error);
  }
}