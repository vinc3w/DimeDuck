const sendEmail = require("@config/smtp");

module.exports = (to, token) => {
  sendEmail(
    to,
    "Password Reset",
    `
    <!DOCTYPE html>
    <html lang="en" style="margin: 0; padding: 0;">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; padding: 30px; border-radius: 8px;">
        <tr>
          <td align="center">
            <h2 style="color: #333333;">Reset Password</h2>
          </td>
        </tr>
        <tr>
          <td style="color: #555555; font-size: 16px; line-height: 1.5; padding: 10px 0;">
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <a href="${process.env.APP_BASE_URL}/reset-password?token=${token}" 
              style="background-color: #4F8A8B; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </td>
        </tr>
        <tr>
          <td style="color: #999999; font-size: 14px; padding-top: 20px;">
            <p>If you didn't request a password reset, please ignore this email.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>

    `
  );
}
