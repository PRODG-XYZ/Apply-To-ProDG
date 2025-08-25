export async function sendSlackNotification(application: {
  name: string;
  email: string;
  phone: string;
  country: string;
  technologies: string[];
  cvUrl?: string;
  linkedinUrl?: string;
  submittedAt: Date;
}) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl || webhookUrl === 'your-slack-webhook-url-here') {
    return;
  }

  try {
    const message = {
      text: `New Application!`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New Application"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${application.name}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${application.email}`
            },
            {
              type: "mrkdwn",
              text: `*Technologies:*\n${application.technologies.length > 0 ? application.technologies.join(', ') : 'None specified'}`
            }
          ]
        },
        {
          type: "actions",
          elements: [
            ...(application.cvUrl ? [{
              type: "button" as const,
              text: {
                type: "plain_text" as const,
                text: "View CV"
              },
              url: application.cvUrl
            }] : []),
            ...(application.linkedinUrl ? [{
              type: "button" as const,
              text: {
                type: "plain_text" as const,
                text: "View LinkedIn"
              },
              url: application.linkedinUrl
            }] : [])
          ]
        }
      ]
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
  }
}
