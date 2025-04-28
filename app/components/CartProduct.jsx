"use client"

import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { AddToCart, RemoveFromCart, RemoveQuantity } from "../features/cart/cartSlice";
import { IoMdAdd } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { handleAddToCart, useAddToCart } from "../utility/AddToCart";
import { useRemoveQuantity } from "../utility/RemoveQuantity";
import { useRemoveFromCart } from "../utility/RemoveFromCart";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const addToCart = useAddToCart();
  const removeQuantity = useRemoveQuantity();
  const removeFromCart = useRemoveFromCart();


  return (
    <tr className="border-dotted border-b border-gray-200">
      <td className="flex items-center space-x-3 py-5">
        <Link href={`/product/${product.id}`}>
          <img
            className="w-[90px] h-[100px] border border-gray-200 rounded py-3"
            src={`https://admin.refabry.com/storage/product/${product.image}`}
            alt=""
          />
        </Link>
        <div className="text-left">
          <h1 className="text-md font-bold">{product.name}</h1>
          <p className="text-sm">
            {product.short_desc.substring(0, 40) + "..."}
          </p>
          <p className="text-xs pt-1">Category: {product.category.name}</p>
        </div>
      </td>
      <td>
        <p className="line-through text-gray-400">${product.price.toFixed(2)}</p>
        <p className="text-lg font-semibold">
          ${(product.price - product.discount_amount).toFixed(2)}
        </p>
      </td>
      <td>
        <span className="flex items-center gap-2 justify-center">
          <button
            className={`bg-[#f7f7f7]  p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-xs hover:bg-white duration-200 cursor-pointer ${
              product.qty == 1 ? "text-gray-300" : "text-black"
            }`}
          >
            <IoRemoveOutline onClick={() => removeQuantity(product.id)} />
          </button>
          <p>{product.qty}</p>
          <button className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-xs hover:bg-white duration-200 cursor-pointer">
            <IoMdAdd onClick={() => addToCart(product)} />
          </button>
        </span>
      </td>
      <td>
        ${((product.price - product.discount_amount) * product.qty).toFixed(2)}
      </td>
      <td>
        <button
          className="hover:text-red-500 active:text-red-600"
          onClick={() => removeFromCart(product.id)}
        >
          <AiFillDelete size={"1.5rem"} />
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
