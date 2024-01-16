import prisma from '@/lib/prisma/prisma'
import { NextRequest } from 'next/server'
export const revalidate = 0;

export async function GET(
  _request: NextRequest,
) {
  const product = await prisma.product.findMany()
  return Response.json(product);
}
