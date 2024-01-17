import { selectFilters } from "@/lib/redux-toolkit";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function filterProductsByText (filterText: string, products: Product[]): Product[] {
  if(filterText) {
    const searchTextFilter = filterText?.toLowerCase();
    const filteredProducts = products.filter(({ title, description }) => 
      title.toLowerCase().includes(searchTextFilter) || description.toLowerCase().includes(searchTextFilter));

    return filteredProducts;
  } else {
    return products;
  }
}

export default function useFilteredProducts (productsProp: Product[] | null) {
  const [products, setProducts] = useState(productsProp);
  const filters = useSelector(selectFilters);
  
  useEffect(() => {
    const { searchTextFilter = '' } = filters;
    if (productsProp) {
      setProducts(filterProductsByText(searchTextFilter, productsProp))
    }
  }, [filters, productsProp])

  return products;
}