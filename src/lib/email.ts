import { Resend } from 'resend';

let resend: Resend | null = null;

function getResendClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

interface ApplicationData {
  name: string;
  email: string;
  technologies: string[];
  submittedAt: Date;
}

export async function sendApplicationConfirmationEmail(applicationData: ApplicationData) {
  const { name, email } = applicationData;

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; color: #1d1d1f;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f7;">
        <tr>
            <td align="center" style="padding: 60px 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 48px 48px 24px 48px; text-align: center; border-bottom: 1px solid #f5f5f7;">
                            <!-- Logo -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 24px;">
                                        <img src="https://apply.prodg.studio/icon.png" alt="Prodg Logo" width="48" height="52" style="display: block;" />
                                    </td>
                                </tr>
                            </table>
                            <h1 style="color: #1d1d1f; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">Application Received</h1>
                            <p style="color: #86868b; font-size: 17px; margin: 8px 0 0 0; font-weight: 400;">Thank you, ${name}</p>
                        </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                        <td style="padding: 48px;">
                            
                            <!-- Next steps -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <h2 style="color: #1d1d1f; font-size: 22px; font-weight: 600; margin: 0 0 24px 0;">Next Steps</h2>
                                    </td>
                                </tr>
                                
                                <!-- Step 1 -->
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td width="32" valign="top" style="padding-right: 16px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="32" height="32" style="background-color: #f5f5f7; border-radius: 16px;">
                                                        <tr>
                                                            <td align="center" valign="middle" height="32" style="color: #86868b; font-size: 14px; font-weight: 600;">1</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td valign="top">
                                                    <p style="color: #1d1d1f; font-size: 17px; margin: 0; font-weight: 500;">Review</p>
                                                    <p style="color: #86868b; font-size: 15px; margin: 4px 0 0 0; line-height: 1.4;">Our team will review your application within 2 weeks.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Step 2 -->
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td width="32" valign="top" style="padding-right: 16px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="32" height="32" style="background-color: #f5f5f7; border-radius: 16px;">
                                                        <tr>
                                                            <td align="center" valign="middle" height="32" style="color: #86868b; font-size: 14px; font-weight: 600;">2</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td valign="top">
                                                    <p style="color: #1d1d1f; font-size: 17px; margin: 0; font-weight: 500;">Interview</p>
                                                    <p style="color: #86868b; font-size: 15px; margin: 4px 0 0 0; line-height: 1.4;">If selected, we'll schedule a conversation to get to know you better.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Step 3 -->
                                <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td width="32" valign="top" style="padding-right: 16px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="32" height="32" style="background-color: #f5f5f7; border-radius: 16px;">
                                                        <tr>
                                                            <td align="center" valign="middle" height="32" style="color: #86868b; font-size: 14px; font-weight: 600;">3</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td valign="top">
                                                    <p style="color: #1d1d1f; font-size: 17px; margin: 0; font-weight: 500;">Decision</p>
                                                    <p style="color: #86868b; font-size: 15px; margin: 4px 0 0 0; line-height: 1.4;">You'll hear from us with our decision and next steps.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Contact -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 32px;">
                                <tr>
                                    <td align="center">
                                        <p style="color: #86868b; font-size: 15px; margin: 0;">
                                            For any inquiries, contact us at <a href="mailto:team@prodg.studio" style="color: #1d1d1f; text-decoration: none; font-weight: 500;">team@prodg.studio</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 48px; text-align: center; border-top: 1px solid #f5f5f7;">
                            <p style="color: #86868b; font-size: 13px; margin: 0;">
                                128 City Road, London, United Kingdom
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  try {
    const resendClient = getResendClient();
    const result = await resendClient.emails.send({
      from: 'ProDG Studios <noreply@prodg.studio>',
      to: [email],
      subject: `Application Received - Nice to meet you, ${name}!`,
      html: htmlTemplate,
    });

    console.log('Email sent successfully:', result);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error };
  }
}
