import prisma from '@/lib/prisma/prisma'
import { NextRequest } from 'next/server'
export const revalidate = 0;

export async function GET(
  _request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const { uid } = params;

  if (uid) {
    const products = await prisma.user.findUnique({
      where: { id: uid },
      include: { products: true },
    })
    return Response.json(products)
  }
}