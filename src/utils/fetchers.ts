export const fetchProductById = async (productId: string) => {
  const res = await fetch(`http://localhost:3001/product/api/${productId}`)
  return res.json()
}

export const fetchProductsOfUser = async (uid: string) => {
  const res = await fetch(`http://localhost:3001/profile/${uid}`)
  return res.json()
}
export const fetchAllProducts = async () => {
  const res = await fetch(`http://localhost:3001/product/api`)
  return res.json()
}