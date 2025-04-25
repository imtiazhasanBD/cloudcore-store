import React from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AddToCart } from "../features/cart/cartSlice";


const Product = ({ product }) => {
  const dispatch = useDispatch();
    
    const {
    id,
    name,
    image,
    short_desc,
    price,
    category,
    discount_amount,
} = product;
console.log(product);


const handleAddToCart = () => {
  dispatch(AddToCart(product));
  alert("Product added to cart successfully")
};

  return (
    <div className="bg-white drop-shadow-sm border p-2 flex flex-col gap-4 border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 duration-200 cursor-pointer">
      <div className="w-full relative p-2 group">
        <img
          className="w-full h-full rounded-md object-cover hover:scale-110 duration-300"
          src={`https://admin.refabry.com/storage/product/${image}`}
          alt=""
        />
        <p className={`absolute top-0 bg-gray-200 text-sm font-bold  p-1 mt-1`}>
          save ${discount_amount}
        </p>
        <FaHeart className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer" />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase text-gray-400 pb-1">{category.name}</p>
        <h1 className="text-lg font-bold line-clamp-2">{name}</h1>
        <p className="desc text-sm hidden md:block lg:block">
          {short_desc.substring(0, 50) + "..."}
        </p>
        <div className="price-buy flex gap-2 items-center pr-2 md:py-1">
            <p className="line-through text-gray-500 text-sm">${price}</p>
            <p className="font-bold text-skyText">${price - discount_amount}</p>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className={`bg-[#f7f7f7] text-black font-semibold p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-green-700 hover:text-white duration-200 cursor-pointer`}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default Product;
