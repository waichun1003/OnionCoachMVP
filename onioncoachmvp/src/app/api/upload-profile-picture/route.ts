import { NextRequest, NextResponse } from 'next/server'
import { uploadProfilePicture } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const imageUrl = await uploadProfilePicture(image)

    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error('Error uploading profile picture:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
} 