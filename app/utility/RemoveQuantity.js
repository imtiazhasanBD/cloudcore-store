import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddToCart, RemoveQuantity } from "../features/cart/cartSlice";

export const useRemoveQuantity = () => {
  const dispatch = useDispatch();

  const handleRemoveQuantity = (id) => {
    dispatch(RemoveQuantity(id));
    toast.info("The item quantity has been removed");
  };

  return handleRemoveQuantity;
};