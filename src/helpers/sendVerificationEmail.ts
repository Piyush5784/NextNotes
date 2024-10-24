import nodemailer from "nodemailer";

interface ApiResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  otp: number
): Promise<ApiResponse> {
  try {
    // Create a transporter for Gmail
    const user = process.env.GMAIL;
    const pass = process.env.GMAIL_PASS;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false, // Add this to accept self-signed certificates
      },
    });

    // Define the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #4a90e2;">NextNotes Verification</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Thank you for signing up with <strong>NextNotes</strong>. Please use the following verification code to complete your registration:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; color: #4a90e2; padding: 10px 20px; border: 2px dashed #4a90e2; border-radius: 5px;">
            ${otp}
          </span>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br><strong>The NextNotes Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #999; font-size: 12px;">&copy; 2024 NextNotes. All rights reserved.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"NextNotes" ${user}`,
      to: email,
      subject: "Your NextNotes Verification Code",
      html: htmlContent, // HTML body
    });
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
