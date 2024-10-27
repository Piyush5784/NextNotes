// Define the email content
export const htmlContentForRegistration = ({ otp }: { otp: number }) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
   <h2 style="text-align: center; color: #4a90e2;">NextNotes Verification</h2>
   <p>Hi <strong>$</strong>,</p>
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
};

export const htmlContentForPasswordReset = ({
  resetLink,
  username,
}: {
  username: string;
  resetLink: string;
}) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="text-align: center; color: #4a90e2;">NextNotes Password Reset</h2>
    <p>Hi <strong>${username}</strong>,</p>
    <p>We received a request to reset your password for your <strong>NextNotes</strong> account. You can reset your password by clicking the button below:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" style="font-size: 16px; color: #ffffff; background-color: #4a90e2; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </div>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Best regards,<br><strong>The NextNotes Team</strong></p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="text-align: center; color: #999; font-size: 12px;">&copy; 2024 NextNotes. All rights reserved.</p>
  </div>`;
};
