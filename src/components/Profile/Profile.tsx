'use client'
import { Box, Button, Paper } from "@mui/material";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { Product } from "@/types/product";
import ProductList from "../Product/ProductList";

interface ProfileProps { products: Product[] }
export default function Profile({ products }: ProfileProps) {
  const router = useRouter();
  const onPostAnOffer = () => {
    router.push('/offer');
  }

  useLayoutEffect(() => {
    onAuthStateChanged((auth) => {
      if (!auth) router.push('/auth');
    })
  }, [router]);

  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: 2,
          p: 4,
          width: '100%'
        }}>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            mb={8}
            >
            <Button
              variant={'contained'}
              onClick={onPostAnOffer}
              >
              Post an offer
            </Button>
          </Box>
          <ProductList products={products} />
      </Paper>
    </Box>
  )
}
