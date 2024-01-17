import { getCurrentUser } from '@/lib/firebase/admin'
import prisma from '@/lib/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/post
export async function POST(
  request: NextRequest,
) {
  const { title, description, imageUrl } = await request.json()
  const { uid } = await getCurrentUser() || {};

  if (!title || !description || !imageUrl) {
    return NextResponse.json({ success: false, data: 'Please provide title, description and imageUrl fields' }, { status: 406 });
  }

  if (uid) {
    const result = await prisma.product.create({
      data: {
        title,
        description,
        image: imageUrl,
        user: { connect: { id: uid } },
      },
    })

    if (result) {
      return NextResponse.json({ success: true, data: result }, { status: 201 });
    }

    return NextResponse.json({ success: false, data: 'DB error occured, entity not created.' }, { status: 403 });
  }

  return NextResponse.json({ success: false, data: '' }, { status: 201 });
}
