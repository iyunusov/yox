import { getCurrentUser } from '@/lib/firebase/admin';
import prisma from '@/lib/prisma/prisma'
import { NextRequest } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;
  if (productId) {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    })
    return Response.json(product)
  }
  return Response.json(null, { status: 400 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const currentUser = await getCurrentUser()
  const { productId } = params;

  if (productId && currentUser) {  
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(productId), userId: currentUser.uid },
    });

    if (deletedProduct) {
      return Response.json({ success: true, data: 'Product deleted!' }, { status: 202 })
    }

    return Response.json({ success: false, data: 'Product not found' }, { status: 404 })
  }

  return Response.json({ success: false, data: 'Product not deleted'}, { status: 400 })
}
