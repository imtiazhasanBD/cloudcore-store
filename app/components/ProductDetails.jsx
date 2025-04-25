"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveQuantity } from "../features/cart/cartSlice";
import { IoCheckmarkSharp } from "react-icons/io5";

const ProductDetails = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Extract colors from description
  const colors = ["Black", "White", "Sky Blue", "Green", "Blue", "Red", "Pink"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setQuantity(existing.qty);
    }
  }, [cart]);

  const handleAddToCart = () => {
    dispatch(AddToCart(product));
    alert("Product added to cart successfully");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-xl bg-gray-100 overflow-hidden">
            <Image
              src={`https://admin.refabry.com/storage/product/${activeImage}`}
              alt={product.name}
              fill
              priority
            />
            {product.discount_amount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {((product.discount_amount/product.price)*100).toFixed(2)}% OFF
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.product_images.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.name)}
                className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                  activeImage === img.name
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={`https://admin.refabry.com/storage/product/${img.name}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{product.category.name}</p>

          <div className="mt-4 flex items-center">
            <p className="text-3xl font-bold text-gray-900">
              ${(product.price-product.discount_amount).toFixed(2)}
            </p>
            {product.discount_amount && (
              <p className="ml-3 text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
            {product.is_discount && (
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Save {product.discount_amount}%
              </span>
            )}
          </div>

          {/* Color Selection */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Color</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedColor === color
                      ? "border-green-400 ring-2 ring-green-200"
                      : "border-gray-300"
                  }`}
                >
                  <span className="sr-only">{color}</span>
                  <span className="flex items-center">
                    <span className="mr-2">{color}</span>
                    {color === "Black" && (
                      <span className="w-4 h-4 bg-black rounded-full inline-block"></span>
                    )}
                    {color === "White" && (
                      <span className="w-4 h-4 bg-white border border-gray-300 rounded-full inline-block"></span>
                    )}
                    {color === "Sky Blue" && (
                      <span className="w-4 h-4 bg-sky-400 rounded-full inline-block"></span>
                    )}
                    {color === "Green" && (
                      <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span>
                    )}
                    {color === "Blue" && (
                      <span className="w-4 h-4 bg-blue-600 rounded-full inline-block"></span>
                    )}
                    {color === "Red" && (
                      <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span>
                    )}
                    {color === "Pink" && (
                      <span className="w-4 h-4 bg-pink-400 rounded-full inline-block"></span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-900">Size</h2>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 border rounded-md text-center ${
                    selectedSize === size
                      ? "bg-green-700 text-white border-green-600"
                      : "border-gray-300"
                  } cursor-pointer`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
            <div className="mt-2 flex items-center">
              <button
                onClick={() => dispatch(RemoveQuantity(product.id))}
                className={`p-2 border border-gray-300 rounded-l-md ${
                  quantity == 1 ? "text-gray-300" : "text-gray-900"
                } cursor-pointer`}
              >
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300 text-center w-12">
                {quantity}
              </div>
              <button
                onClick={handleAddToCart}
                className="p-2 border border-gray-300 rounded-r-md cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8 flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 bg-green-700 text-white py-3 px-8 rounded-md font-medium hover:bg-green-800 focus:outline-none focus:ring-2 cursor-pointer">
              Add to Cart
            </button>
            <button className="flex-1 bg-white text-green-600 py-3 px-8 rounded-md font-medium border border-green-600 hover:bg-green-50 focus:outline-none cursor-pointer">
              Buy Now
            </button>
          </div>

          {/* Stock Info */}
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            In stock ({product.stock} available)
          </div>
        </div>
      </div>
      {/* Product Description */}
      <div className="mt-10 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Description</h2>
        <div className="mt-2 prose prose-sm text-gray-500 whitespace-pre-line">
          {product.short_desc}
        </div>
      </div>
      {/* Product Features */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900">Product Features</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-green-700">
            <IoCheckmarkSharp size={"1.5rem"} />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                Premium Quality
              </h3>
              <p className="mt-1 text-gray-500">
                Made with high-quality fabric for ultimate comfort and
                durability.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-green-700">
            <IoCheckmarkSharp size={"1.5rem"} />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Perfect Fit</h3>
              <p className="mt-1 text-gray-500">
                Available in multiple sizes to ensure the perfect fit for
                everyone.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-green-700">
            <IoCheckmarkSharp size={"1.5rem"} />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                Vibrant Colors
              </h3>
              <p className="mt-1 text-gray-500">
                Multiple color options to match your personal style and vibe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
