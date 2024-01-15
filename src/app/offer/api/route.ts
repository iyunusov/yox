import prisma from '@/lib/prisma'
import { getAuth } from '@firebase/auth'
import { NextRequest } from 'next/server'

// POST /api/post
// Required fields in body: title, uid, imageUrl
export async function POST(
  request: NextRequest,
) {
  const { uid, title, description, imageUrl } = await request.json()
  const result = await prisma.product.create({
    data: {
      title,
      description,
      image: imageUrl,
      user: { connect: { id: uid } },
    },
  })
  return new Response (
    JSON.stringify(result),
    { status: 201 },
  );
}