import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddToCart, RemoveFromCart } from "../features/cart/cartSlice";

export const useRemoveFromCart = () => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(RemoveFromCart(id));
    toast.info("The item has been removed from the cart");
  };

  return handleRemoveFromCart;
};