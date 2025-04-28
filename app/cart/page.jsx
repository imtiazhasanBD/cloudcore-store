"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import CartProduct from "../components/CartProduct";
import CartProductMobile from "../components/CartProductMobile";

const page = () => {
  const cart = useSelector((state) => state.cart.items);
  console.log(cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (acc, product) =>
        acc + (product.price - product.discount_amount) * product.qty,
      0
    );
    setTotalPrice(total);
    const totalDiscount = cart.reduce(
      (acc, product) => acc + product.discount_amount * product.qty,
      0
    );
    setTotalDiscount(totalDiscount);

    const items = cart
      .map((product) => product.qty)
      .reduce((total, qty) => total + qty, 0);
    setTotalItems(items);
  }, [cart]);
  console.log(totalItems, totalPrice, totalDiscount);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="m-auto p-4 lg:mx-8 md:mx-8 relative bg-white mb-2">
        <h1 className="text-3xl font-bold text-green-700">Shopping Cart</h1>
        <p className="text-ml text-gray-400">
          There are {cart.length} Items in your cart
        </p>
        {cart.length > 0 ? (
          <section className="flex justify-between lg:flex-row flex-col  lg:space-x-10 mt-10">
            {/* for medium and lagre screen */}
            <div className="w-[60%] sm:w-full space-y-3 hidden md:block lg:block sm:block">
              <table className="w-full">
                <thead className="border-b text-center bg-green-700 text-white">
                  <tr className="font-bold">
                    <td className="text-gray-40 py-2 pl-3 text-left">
                      Product
                    </td>
                    <td className="text-gray-40 py-2 px-4">Price</td>
                    <td className="text-gray-40 py-2 px-4">Quantity</td>
                    <td className="text-gray-40 py-2 px-4">Total</td>
                    <td className="text-gray-40 py-2 px-4">Delete</td>
                  </tr>
                </thead>
                <tbody className="space-y-10 text-center">
                  {cart &&
                    cart.map((product) => (
                      <CartProduct product={product} key={product.unique_id} />
                    ))}
                </tbody>
              </table>
              <Link href="/">
                <button className="flex items-center gap-3 text-white bg-green-700 font-semibold rounded p-2 my-5">
                  <BsArrowLeft />
                  <span>Continue Shopping</span>
                </button>
              </Link>
            </div>
            {/* Mobile screen*/}

            <div className="sm:hidden px-4 divide-y divide-gray-200 border-b border-t border-gray-200 mb-10">
              {cart &&
                cart.map((product) => (
                  <CartProductMobile
                    product={product}
                    key={product.unique_id}
                  />
                ))}
            </div>

            <div className="lg:w-[40%] w-full h-fit border border-gray-200 rounded p-5 space-y-2 text-sm bg-gray-50">
              <h1 className="text-xl font-semibold p-2">Oder Summary</h1>
              <div className="flex justify-between items-center p-2">
                <h1 className="">Sub Total ({totalItems} items)</h1>
                <p>${(totalPrice + totalDiscount).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center p-2">
                <h1 className="">shipping</h1>
                <p>$80</p>
              </div>
              <div className="flex justify-between items-center p-2 font-semibold border-b-2 border-dotted border-gray-200">
                <h1 className="">Discount</h1>
                <p>-{totalDiscount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center p-2 font-semibold text-xl">
                <h1 className="">Sub Total</h1>
                <p>${(totalPrice + 80).toFixed(2)}</p>
              </div>
              <Link href={"/checkout"}>
                <button className="w-full p-2 bg-green-700 text-center text-white font-bold text-lg rounded cursor-pointer">
                  CheckOut
                </button>
              </Link>
            </div>
          </section>
        ) : (
          <div>
            <p className="text-gray-600 mt-10">
              No Cart products yet. Browse and add some!
            </p>
            <Link href="/">
              <button className="flex items-center gap-3 text-white bg-green-700 font-semibold rounded p-2 my-5 cursor-pointer">
                <BsArrowLeft />
                <span>Continue Shopping</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
