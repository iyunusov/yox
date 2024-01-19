'use client'
import * as React from 'react';
import { Grid } from '@mui/material';
import { Product } from '@/types/product';
import ProductItem from './ProductItem';
import useFilteredProducts from '@/hooks/useFilteredProducts';

interface ProductListProps { products: Product[] | null };
export default function ProductList({ products: productsProp }: ProductListProps) {
  const products = useFilteredProducts(productsProp);

  return (
    <Grid container spacing={{ xs: 4, sm: 2, md: 4, }} position={'relative'}>
      {products?.map((product) => {
        return (
          <ProductItem key={product.id} product={product} />
        )
      })}
    </Grid>
  );
}