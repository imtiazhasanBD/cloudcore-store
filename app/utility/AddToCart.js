import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddToCart } from "../features/cart/cartSlice";

export const useAddToCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
    toast.success("The product added successfully!");
  };

  return handleAddToCart;
};