import ProductView from "@/components/Product/ProductView";
import { Product } from "@/types/product";
import { fetchProductById } from "@/utils/fetchers";

interface PageProps { params: { productId: string } };
export default async function Page({ params }: PageProps) {
  let product: Product | null = (await fetchProductById(params.productId));
  
  return <>{product && (<ProductView product={product} />)}</>
}
