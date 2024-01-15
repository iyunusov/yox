import prisma from '@/lib/prisma/prisma'
import { NextRequest } from 'next/server'

export async function GET(
  _request: NextRequest,
) {
    const product = await prisma.product.findMany()
    return Response.json(product);
}
