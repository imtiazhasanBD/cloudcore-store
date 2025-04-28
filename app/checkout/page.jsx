"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { redirect, useRouter } from "next/navigation";

const OrderForm = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const router = useRouter();
  const [errors, setErrors] = useState({
    c_phone: "",
  });

  if (!cartItems || cartItems.length === 0) {
    redirect('/'); 
  }

  // Validate Bangladeshi phone number
  const validateBangladeshiPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const regex = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
    return regex.test(cleaned);
  };

  // Calculate total from cart items
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price - item.discount_amount) * item.qty,
      0
    );
  };

  // Initialize form data
  const [formData, setFormData] = useState({
    product_ids: cartItems.map((item) => item.id).join(","),
    s_product_qty: cartItems.map((item) => item.qty).join(","),
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast",
    advance: null,
    cod_amount: calculateTotal().toString(),
    discount_amount: null,
    delivery_charge: "80",
  });

  // Update COD amount when cart changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product_ids: cartItems.map((item) => item.id).join(","),
      s_product_qty: cartItems.map((item) => item.qty).join(","),
      cod_amount: calculateTotal().toString(),
    }));
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number validation
    if (name === "c_phone") {
      if (value && !validateBangladeshiPhone(value)) {
        setErrors({...errors, c_phone: "Please enter a valid Bangladeshi phone number"});
      } else {
        setErrors({...errors, c_phone: ""});
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validateBangladeshiPhone(formData.c_phone)) {
      toast.error("Please enter a valid Bangladeshi phone number");
      return;
    }

    try {
      const response = await axios.post(
        "https://admin.refabry.com/api/public/order/create",
        formData
      );
      
      setFormData({
        ...formData,
        c_name: "",
        c_phone: "",
        address: "",
      });
      
      dispatch(clearCart());
      router.push(`/order-success?order_id=${response.data.data.id}`);
      toast.success("Order placed successfully!");
    } catch (error) {
      if (error.response?.data?.errors?.c_phone) {
        setErrors({...errors, c_phone: error.response.data.errors.c_phone[0]});
      }
      toast.error("Failed to place order");
      console.error("Order error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Place Your Order
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.unique_id} className="flex justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <img
                      src={`https://admin.refabry.com/storage/product/${item.image}`}
                      alt={item.name}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="font-medium">
                  ${((item.price - item.discount_amount) * item.qty).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${formData.delivery_charge}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total to Pay</span>
                <span>
                  $
                  {(
                    parseFloat(formData.cod_amount) +
                    parseFloat(formData.delivery_charge)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">
              Delivery Information
            </h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Courier:</span> {formData.courier}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Payment:</span> Cash on Delivery
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="c_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="c_name"
              name="c_name"
              value={formData.c_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="c_phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="phone"
              id="c_phone"
              name="c_phone"
              value={formData.c_phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.c_phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="01XXXXXXXXX"
              required
            />
            {errors.c_phone && (
              <p className="mt-1 text-sm text-red-600">{errors.c_phone}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Format: 01XXXXXXXXX (11 digits)
            </p>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Hidden fields for order data */}
          <input
            type="hidden"
            name="product_ids"
            value={formData.product_ids}
          />
          <input
            type="hidden"
            name="s_product_qty"
            value={formData.s_product_qty}
          />
          <input type="hidden" name="courier" value={formData.courier} />
          <input type="hidden" name="cod_amount" value={formData.cod_amount} />
          <input
            type="hidden"
            name="delivery_charge"
            value={formData.delivery_charge}
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 px-4 rounded-md hover:bg-green-800 cursor-pointer"
            disabled={!!errors.c_phone}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;