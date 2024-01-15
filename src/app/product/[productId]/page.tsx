import ProductView from "@/components/Product/ProductView";
import { getCurrentUser } from "@/lib/firebase/admin";
import { Product } from "@/types/product";
import { fetchProductById } from "@/utils/fetchers";

interface PageProps { params: { productId: string } };
export default async function Page({ params }: PageProps) {
  const currentUser = await getCurrentUser();
  let product: Product | null = null;

  if (currentUser) {
    const { uid = '' } = currentUser;
    if (uid) {
      product = (await fetchProductById(params.productId));
    }
  }
  
  return <>{product && (<ProductView product={product} />)}</>
}
