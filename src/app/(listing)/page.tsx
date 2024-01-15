import Landing from "@/components/Landing/Landing";
import { Product } from "@/types/product";
import { fetchAllProducts } from "@/utils/fetchers";

export default async function Page() {
  let products: Product[] = await fetchAllProducts()

  return (
    <Landing products={products} />
  )
}