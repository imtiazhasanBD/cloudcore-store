"use client"

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { useEffect } from 'react';

const Products = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.product);
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, []);

    
console.log(products);
  
  return (
    <div>Products</div>
  )
}

export default Products