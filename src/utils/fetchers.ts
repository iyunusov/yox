const url = `${process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ? 'http': 'https'}://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//Fetches a single product.
export const fetchProductById = async (productId: string) => {
  try {
    const res = await fetch(`${url}/product/api/${productId}`)
    return await res.json()
  } catch (error) {
    console.log(error);
    Promise.reject(null);
  }
}

//Fetches all products of signed in user.
export const fetchProductsOfUser = async (uid: string) => {
  try {
    const res = await fetch(`${url}/profile/api/${uid}`)
    return await res.json()
  } catch (error) {
    console.log(error);
    Promise.reject(null);
  }
}

//Fetches all available products.
export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${url}/product/api/all`,  { cache: 'no-store' })
    return await res.json();
  } catch (error) {
    console.log(error);
    Promise.reject(null)
  }
}