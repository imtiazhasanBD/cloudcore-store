"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { useEffect } from "react";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  
  if(!products.data){
    return "loading..."
  }
  console.log(products.data);

  return (
    <div className="md:w-[95%] px-2 m-auto mt-5 mb-4 bg-white">
    <div className="flex justify-between p-2 px-4 font-semibold border-b-2">
      <p className="text-xl">Just For You</p>
      <button className="text-green-700">View All Products</button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-5 md:p-4 z-20 pt-4">
      {products?.data &&
        products?.data.map((product) => (
          <Product product={product} key={product.unique_id} />
        ))}
    </div>
  </div>
  );
};

export default Products;
