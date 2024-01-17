import { getCurrentUser } from "@/lib/firebase/admin";
import prisma from "@/lib/prisma/prisma";

//Fetches a single product.
export const fetchProductById = async (productId: string) => {
  try {
    return await prisma.product.findUnique({
      where: { id: Number(productId) },
    })
  } catch (error) {
    console.log(error);
  }
  return null;
}

//Fetches all products of signed in user.
export const fetchProductsOfUser = async () => {
  try {
    const currentUser = await getCurrentUser();  
    const { uid } = currentUser || {};
    if (uid) {
      return await prisma.user.findUnique({
        where: { id: uid },
        include: { products: true },
      })
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

//Fetches all available products.
export const fetchAllProducts = async () => {
  try {
    return await prisma.product.findMany()
  } catch (error) {
    console.log(error);
  }
  return null;
}