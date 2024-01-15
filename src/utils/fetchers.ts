export const fetchProductById = async (productId: string) => {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/product/api/${productId}`)
  return res.json()
}

export const fetchProductsOfUser = async (uid: string) => {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/profile/${uid}`)
  return res.json()
}
export const fetchAllProducts = async () => {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/product/api`)
  return res.json()
}