import nodemailer from 'nodemailer';
import { InquiryItem } from './inquiriesStore';

export async function sendInquiryNotificationEmail(inquiry: InquiryItem) {
  // Target destination inbox for all customer inquiries and quotes
  const recipientEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    'sales@hikvisionuae.ae';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hikvisionuae.ae';

  console.log(`[EMAIL NOTIFICATION] 📧 Target Destination Email for Quote/Inquiry: ${recipientEmail}`);

  // SMTP configuration (from .env / .env.local)
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const isProduct = inquiry.type === 'product_enquiry';
      const subject = isProduct
        ? `🚨 New Quote Request: ${inquiry.productName || inquiry.name}`
        : `🚨 New Contact Inquiry from ${inquiry.name}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 24px; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #eaeaea;">
            <div style="background-color: #E8272A; padding: 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">HIKVISION UAE</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">New Customer Lead / Quote Request</p>
            </div>
            
            <div style="padding: 24px;">
              <div style="background-color: #f8fafc; border-left: 4px solid #E8272A; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
                <strong style="font-size: 14px; color: #1e293b;">Requirement / Target:</strong>
                <span style="font-size: 14px; color: #0088cc; font-weight: bold;">${inquiry.requirement || inquiry.subject}</span>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 120px; font-weight: bold;">Client Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${inquiry.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email Address:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}" style="color: #0088cc; text-decoration: none; font-weight: 600;">${inquiry.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone / Mobile:</td>
                  <td style="padding: 8px 0;"><a href="tel:${inquiry.phone}" style="color: #0088cc; text-decoration: none; font-weight: 600;">${inquiry.phone}</a></td>
                </tr>
                ${inquiry.company ? `
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${inquiry.company}</td>
                </tr>` : ''}
                ${inquiry.productName ? `
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Requested Product:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${inquiry.productName}</td>
                </tr>` : ''}
              </table>

              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">Customer Message:</div>
                <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap;">
                  ${inquiry.message}
                </div>
              </div>

              <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                <a href="${siteUrl}/admin" style="display: inline-block; background-color: #0088cc; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 13px;">
                  Open Admin Lead Portal →
                </a>
              </div>
            </div>

            <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #eaeaea;">
              Received on: ${new Date(inquiry.createdAt).toLocaleString()} | Hikvision UAE Sales Portal
            </div>
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"Hikvision UAE Quotes" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: inquiry.email,
        subject: subject,
        html: htmlContent
      });

      console.log('[EMAIL NOTIFICATION SENT TO sales@hikvisionuae.ae] ID:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.error('[EMAIL NOTIFICATION SEND ERROR]:', err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`[EMAIL NOTIFICATION LOGGED]: Lead targeted for: ${recipientEmail}. Inquiries are also live on Admin Dashboard.`);
    return { success: true, logged: true };
  }
}
