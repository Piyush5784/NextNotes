"use server";
import { feedbackForm } from "@/types/Ztypes";
import nodemailer from "nodemailer";
import * as z from "zod";
import { ApiResponse } from "./sendVerificationEmail";
export async function sendFeedbackEmail(
  values: z.infer<typeof feedbackForm>,
  email: string
): Promise<ApiResponse> {
  try {
    const user = process.env.GMAIL;
    const pass = process.env.GMAIL_PASS;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Construct the HTML content for the feedback email
    const feedbackContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="text-align: center; color: #4a90e2;">New Feedback from NextNotes</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Issue tag:</strong> ${values.tag}</p>
          <p><strong>Feedback:</strong></p>
          <p>${values.Description}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="text-align: center; color: #999; font-size: 12px;">&copy; 2024 NextNotes. All rights reserved.</p>
        </div>
      `;

    await transporter.sendMail({
      from: `"NextNotes" ${user}`,
      to: process.env.FEEDBACK_EMAIL, // Specify the email address to receive feedback
      subject: "New Feedback Submission",
      html: feedbackContent,
    });
    return {
      success: true,
      message: "Feedback email sent successfully",
    };
  } catch (error) {
    console.error("Error sending feedback email", error);
    return {
      success: false,
      message: "Failed to send feedback email",
    };
  }
}
