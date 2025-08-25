# Job Application Portal

A modern, beautiful job application platform built with Next.js 14, featuring Apple-inspired design, smooth animations, and MongoDB storage.

## Features

- 🎨 **Apple-inspired Design**: Clean, minimal interface with beautiful typography and smooth animations
- 📱 **Mobile-Friendly**: Fully responsive design that works perfectly on all devices
- 🔄 **Multi-Step Form**: Intuitive 5-step application wizard with progress tracking
- 📁 **File Upload**: CV upload with drag-and-drop functionality
- 🔐 **Admin Dashboard**: Secure admin panel to view and manage applications
- 📬 **Slack Integration**: Optional notifications to your company Slack channel
- ⚡ **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB
- **Authentication**: JWT-based admin authentication
- **File Handling**: Local file storage with validation
- **Forms**: React Hook Form with validation

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/apply_prodg
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   SLACK_WEBHOOK_URL=your-slack-webhook-url-here
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or start manually
   mongod
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Main application: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login
   - Default admin credentials: `admin` / `admin123`

## Application Flow

### For Applicants
1. **Landing Page** (`/`) - Welcome screen with call-to-action
2. **Application Form** (`/apply`) - 5-step wizard:
   - Step 1: Basic Info (name, email, phone)
   - Step 2: CV Upload (optional PDF/DOC upload)
   - Step 3: Motivation (what excites you about tech)
   - Step 4: Insights (proud project + dream project)
   - Step 5: Links (GitHub, LinkedIn, portfolio)
3. **Success Page** (`/success`) - Confirmation with animations

### For Admins
1. **Admin Login** (`/admin/login`) - Secure authentication
2. **Dashboard** (`/admin`) - View all applications with details modal

## Slack Integration (Optional)

To enable Slack notifications for new applications:

1. Create a Slack webhook in your workspace:
   - Go to https://api.slack.com/messaging/webhooks
   - Create a new webhook for your desired channel
   - Copy the webhook URL

2. Update your `.env.local`:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

3. New applications will automatically send notifications to your Slack channel with applicant details and a link to the admin dashboard.

## File Storage

- CV files are stored locally in `/public/uploads/`
- Supported formats: PDF, DOC, DOCX
- Maximum file size: 10MB
- Files are accessible via direct URL for admin review

## Security Features

- JWT-based admin authentication
- Protected admin routes with middleware
- Input validation and sanitization
- File type and size validation
- SQL injection prevention (NoSQL with MongoDB)

## Customization

### Design
- Colors and styling can be customized in `tailwind.config.js`
- Animations can be modified in individual components using Framer Motion

### Form Fields
- Add/remove form fields by modifying the step components in `/src/components/steps/`
- Update the `FormData` interface in `/src/types/application.ts`
- Adjust validation rules in the form components

### Admin Features
- Extend the admin dashboard by modifying `/src/app/admin/page.tsx`
- Add status management, filtering, or export features

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure MongoDB connection is accessible from your server
4. Set up file storage (consider cloud storage for production)

## Production Considerations

- **Database**: Use MongoDB Atlas or another cloud database service
- **File Storage**: Consider using AWS S3, Google Cloud Storage, or similar
- **Security**: Change default admin credentials and JWT secret
- **Monitoring**: Add error tracking and analytics
- **Backup**: Implement database backup strategy

## Support

For issues or questions:
1. Check the application logs in the browser console
2. Verify MongoDB connection
3. Ensure all environment variables are set correctly
4. Check file permissions for the uploads directory

## License

This project is created for internal use. Modify and distribute according to your organization's policies.