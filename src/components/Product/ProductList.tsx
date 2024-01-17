'use client'
import * as React from 'react';
import { Grid } from '@mui/material';
import { Product } from '@/types/product';
import ProductItem from './ProductItem';
import { selectFilters, useSelector } from '@/lib/redux-toolkit';
import { useEffect, useState } from 'react';

interface ProductListProps { products: Product[] | null };
export default function ProductList({ products: productsProp }: ProductListProps) {
  const [products, setProducts] = useState(productsProp);
  const filters = useSelector(selectFilters);
  
  useEffect(() => {
    const { searchTextFilter: _searchTextFilter } = filters;
    if (_searchTextFilter && productsProp) {
      const searchTextFilter = _searchTextFilter.toLowerCase();
      const filteredProducts = productsProp.filter(({ title, description }) => 
        title.toLowerCase().includes(searchTextFilter) || description.toLowerCase().includes(searchTextFilter));

      setProducts(filteredProducts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useEffect(() => {
    setProducts(productsProp);
  }, [productsProp])

  return (
    <Grid container spacing={{ xs: 0, sm: 2, md: 4 }} position={'relative'}>
      {products?.map((product) => {
        return (
          <ProductItem key={product.id} product={product} />
        )
      })}
    </Grid>
  );
}