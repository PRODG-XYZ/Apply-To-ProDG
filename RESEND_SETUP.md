# Resend Email Setup Instructions

## Environment Variable Required

Add the following environment variable to your `.env.local` file:

```bash
RESEND_API_KEY=re_xxxxxxxxx
```

## Getting Your Resend API Key

1. Sign up or log in to [Resend](https://resend.com)
2. Go to the [API Keys page](https://resend.com/api-keys)
3. Create a new API key
4. Copy the key and add it to your environment variables

## Email Configuration

The email service is configured in `src/lib/email.ts`. You may want to update:

- **From address**: Currently set to `Apply Team <noreply@resend.dev>` - update with your verified domain
- **Reply-to address**: Currently set to `team@resend.dev` - update with your actual email
- **Domain verification**: Add your domain in Resend dashboard for custom from addresses

## Features

The confirmation email includes:
- ✨ Beautiful, modern HTML design with gradients and animations
- 📊 Application stats showing number of technologies
- ⚙️ Visual tech stack badges
- 🎯 Clear next steps information
- 📧 Professional but quirky tone
- 📱 Mobile-responsive design

## Testing

To test the email functionality:
1. Add your Resend API key to `.env.local`
2. Submit a test application through the form
3. Check your email for the confirmation message

## Troubleshooting

- Ensure your API key is correct and has the necessary permissions
- Check that your domain is verified if using custom from addresses
- Review the console logs for any error messages
