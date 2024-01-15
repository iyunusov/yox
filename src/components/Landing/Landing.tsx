'use client'
import * as React from 'react';
import { Paper } from '@mui/material';
import { Product } from '@/types/product';
import ProductList from '../Product/ProductList';

interface LandingProps { products: Product[] };
export default function Landing({ products }: LandingProps) {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 2,
        p: 4,
      }}>
        <ProductList products={products} />
    </Paper>
  );
}