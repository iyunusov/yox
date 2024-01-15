import Profile from "@/components/Profile/Profile";
import { getCurrentUser } from "@/lib/firebase/admin";
import { fetchProductsOfUser } from "@/utils/fetchers";

export default async function Page() {
  const currentUser = await getCurrentUser();
  let products: any = [];
  
  if (currentUser) {
    const { uid = '' } = currentUser;
    if (uid) {
      products = (await fetchProductsOfUser(uid))?.products;
    }
  }

  return (
    <Profile products={products} />
  )
}
