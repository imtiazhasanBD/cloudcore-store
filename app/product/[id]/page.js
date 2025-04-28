"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import ProductDetails from "@/app/components/ProductDetails";
import Product from "@/app/components/Product";
import Loading from "@/app/loading";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const { products } = useSelector((state) => state.product);
  
  
  useEffect(() => {
    if (id) {
      const product = products?.data?.find((p) => p.id.toString() === id);
      setProduct(product);
    }
    if (products) {
      const relatedProduct = products?.data.filter(
        (p) => p.category.name === product?.category.name
      );
      setRelatedProduct(relatedProduct);
    }
  }, [id, product,products]);

  console.log(product);
  
  if (!product) return <Loading/>;

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-10 py-8 bg-white lg:mx-8 lg:mb-2">
      <ProductDetails product={product} />

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-b-green-700 pb-2">
          Related Products
        </h2>
        {/* Releted Products Add section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {!relatedProduct
            ? "loading...."
            : relatedProduct.map((product) => (
                <Product product={product} key={product.id} />
              ))}
        </div>
      </section>
    </div>
  );
}
