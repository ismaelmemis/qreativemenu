import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { imagePath: string } }) {
  const imagePath = params.imagePath;
  const filePath = path.join(process.cwd(), 'public/qr', imagePath);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const response = new NextResponse(fileBuffer);

    // Set the appropriate Content-Type header
    response.headers.set('Content-Type', getContentType(imagePath));

    return response;
  } catch {
    return NextResponse.json({ error: 'Image not found', filePath }, { status: 404 });
  }
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
