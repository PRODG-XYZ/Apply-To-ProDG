import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToS3 } from '@/lib/s3';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
      return NextResponse.json({ error: 'Only PDF and DOC files are allowed' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate sanitized filename
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');

    // Upload to S3
    const fileUrl = await uploadFileToS3(buffer, sanitizedFileName, file.type);

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: file.name
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    );
  }
}
