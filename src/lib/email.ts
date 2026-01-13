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
    <div style="max-width: 600px; margin: 60px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
        
        <!-- Header -->
        <div style="padding: 48px 48px 24px 48px; text-align: center; border-bottom: 1px solid #f5f5f7;">
            <!-- Logo -->
            <div style="margin-bottom: 24px;">
                <svg width="48" height="52" viewBox="0 0 222 250" fill="none" style="display: inline-block; color: #1d1d1f;">
                    <path d="M115 123.5V237.164C115 240.223 111.707 242.15 109.041 240.651L12.0405 186.147C10.7801 185.438 10 184.105 10 182.659V66.5M115 123.5L10 66.5M115 123.5L211.5 66.5M10 66.5L107.536 10.625C108.755 9.92701 110.25 9.91905 111.476 10.6041L211.5 66.5M211.5 66.5V182.82C211.5 184.179 210.81 185.445 209.669 186.182L165 215" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h1 style="color: #1d1d1f; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">Application Received</h1>
            <p style="color: #86868b; font-size: 17px; margin: 8px 0 0 0; font-weight: 400;">Thank you, ${name}</p>
        </div>

        <!-- Main content -->
        <div style="padding: 48px;">
            
            <!-- Next steps -->
            <div style="margin-bottom: 32px;">
                <h2 style="color: #1d1d1f; font-size: 22px; font-weight: 600; margin: 0 0 24px 0;">Next Steps</h2>
                <div style="space-y: 16px;">
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                        <div style="width: 32px; height: 32px; background-color: #f5f5f7; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <span style="color: #86868b; font-size: 14px; font-weight: 600;">1</span>
                        </div>
                        <div>
                            <p style="color: #1d1d1f; font-size: 17px; margin: 0; font-weight: 500;">Review</p>
                            <p style="color: #86868b; font-size: 15px; margin: 4px 0 0 0; line-height: 1.4;">Our team will review your application within 2 weeks.</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                        <div style="width: 32px; height: 32px; background-color: #f5f5f7; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <span style="color: #86868b; font-size: 14px; font-weight: 600;">2</span>
                        </div>
                        <div>
                            <p style="color: #1d1d1f; font-size: 17px; margin: 0; font-weight: 500;">Interview</p>
                            <p style="color: #86868b; font-size: 15px; margin: 4px 0 0 0; line-height: 1.4;">If selected, we'll schedule a conversation to get to know you better.</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start;">
                        <div style="width: 32px; height: 32px; background-color: #f5f5f7; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <span style="color: #86868b; font-size: 14px; font-weight: 600;">3</span>
                        </div>
                        <div>
                            <p style="color: #1d1d1f; font-size: 17px; margin: 0; font-weight: 500;">Decision</p>
                            <p style="color: #86868b; font-size: 15px; margin: 4px 0 0 0; line-height: 1.4;">You'll hear from us with our decision and next steps.</p>
                        </div>
                    </div>
                </div>
            </div>

            

            <!-- Contact -->
            <div style="margin-top: 32px; text-align: center;">
                <p style="color: #86868b; font-size: 15px; margin: 0;">
                    For any inquiries, contact us at <a href="mailto:team@prodg.studio" style="color: #1d1d1f; text-decoration: none; font-weight: 500;">team@prodg.studio</a>
                </p>
            </div>

        </div>

        <!-- Footer -->
        <div style="padding: 24px 48px; text-align: center; border-top: 1px solid #f5f5f7;">
            <p style="color: #86868b; font-size: 13px; margin: 0;">
                128 City Road, London, United Kingdom
            </p>
        </div>
    </div>
</body>
</html>
  `;

  try {
    const resendClient = getResendClient();
    const result = await resendClient.emails.send({
      from: 'Apply Team <noreply@prodg.studio>',
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
