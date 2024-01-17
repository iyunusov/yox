import Profile from "@/components/Profile/Profile";
import { fetchProductsOfUser } from "@/utils/fetchers";
export const dynamic = 'force-dynamic';

export default async function Page() {
  const products = (await fetchProductsOfUser())?.products || null;

  return (
    <Profile products={products} />
  )
}
