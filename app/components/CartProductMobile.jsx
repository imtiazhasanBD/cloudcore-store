import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { AddToCart, RemoveFromCart, RemoveQuantity } from '../features/cart/cartSlice';
import { RxCross2 } from "react-icons/rx";
import { IoRemoveOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useAddToCart } from '../utility/AddToCart';
import { useRemoveQuantity } from '../utility/RemoveQuantity';
import { useRemoveFromCart } from '../utility/RemoveFromCart';


const CartProductMobile = ({product}) => {
    const dispatch = useDispatch();
    const { id, name, qty, image, short_desc, price, category, discount_amount } =
    product;

    const addToCart = useAddToCart();
    const removeQuantity = useRemoveQuantity();
    const removeFromCart = useRemoveFromCart();

  return (
    <div className="flex gap-4 py-6 sm:py-10">
    <Link href={`/product/${id}`}>
      <img
        src={`https://admin.refabry.com/storage/product/${image}`}
        alt={name}
        className="h-24 w-24 rounded-md object-cover object-center border border-gray-200"
      />
    </Link>
    <section className="relative pr-9 flex flex-col gap-1 w-full">
      <h1 className="text-base font-semibold">{name}</h1>
      <p className="text-sm">{short_desc.substring(0, 40) + '...'}</p>
      <p className="text-xs">Category: {category.name}</p>
      <div className="flex items-center gap-8 pt-2">
        <span>
          <p className="line-through text-gray-400">${price.toFixed(2)}</p>
          <p className="text-lg font-semibold">
            ${(price - discount_amount).toFixed(2)}
          </p>
        </span>
        <span className="flex items-center gap-2">
          <button className={`bg-[#f7f7f7]  p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-base hover:bg-white duration-200 cursor-pointer ${qty == 1? 'text-gray-300' : 'text-black'}`}>
            <IoRemoveOutline onClick={ () => removeQuantity(id)}/>
          </button>
          <p>{qty}</p>
          <button className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-base hover:bg-white duration-200 cursor-pointer">
            <IoMdAdd onClick={ () => addToCart(product)}/>
          </button>
        </span>
      </div>
      <button
        className="absolute top-0 right-0 text-lg"
        onClick={() => removeFromCart(id)}
      >
        <RxCross2 className="inline-flex text-gray-600 hover:text-red-600" />
      </button>
    </section>
  </div>
  )
}

export default CartProductMobile