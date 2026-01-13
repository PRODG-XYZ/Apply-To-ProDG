import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Application } from '@/types/application';
import { sendSlackNotification } from '@/lib/slack';
import { sendApplicationConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const application: Omit<Application, '_id'> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      cvUrl: data.cvUrl,
      cvFileName: data.cvFileName,
      motivation: data.motivation,
      proudProject: data.proudProject,
      dreamProject: data.dreamProject,
      technologies: data.technologies || [],
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      portfolioUrl: data.portfolioUrl,
      submittedAt: new Date(),
      status: 'pending'
    };

    const client = await clientPromise;
    const db = client.db('apply_prodg');
    const result = await db.collection('applications').insertOne(application);

    // Send Slack notification
    await sendSlackNotification({
      name: application.name,
      email: application.email,
      phone: application.phone,
      country: application.country,
      technologies: application.technologies,
      cvUrl: application.cvUrl,
      linkedinUrl: application.linkedinUrl,
      submittedAt: application.submittedAt
    });

    // Send confirmation email to applicant
    try {
      await sendApplicationConfirmationEmail({
        name: application.name,
        email: application.email,
        technologies: application.technologies,
        submittedAt: application.submittedAt
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the entire application submission if email fails
    }

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('apply_prodg');
    const applications = await db.collection('applications')
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' }, 
      { status: 500 }
    );
  }
}
