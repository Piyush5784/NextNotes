import VerificationEmail from "@/components/email-template/verificationEmailTemplate";
import { resend } from "@/lib/resend";

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
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email.toLowerCase(),
      subject: "Verification code ",
      react: VerificationEmail({ username, otp }),
    });
    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
