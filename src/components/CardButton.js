import { TbShoppingBag } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { getSubtotal } from "../features/products/cartSlice";
import { useEffect } from "react";
import { currencyFormatter } from "../utils/currencyFormatter";
const CartButton = ({ data, cartTotalAmount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubtotal());
  }, [data, dispatch]);
  return (
    <>
      <div className="hidden lg:block">
        <div className="flex  flex-col rounded-tl-md rounded-bl-md bg-[#C3161C] p-3 z-[9999]">
          <div className="flex gap-1 items-center justify-center text-[1rem] text-lime-50 ">
            <TbShoppingBag />
            <span className="inline-block text-[0.8rem] ">
              {data?.length} items
            </span>
          </div>
          <span className="mt-3 rounded bg-lime-50 px-1 text-sm py-1 text-[#331b08]">
            {cartTotalAmount} ৳
          </span>
        </div>
      </div>
    </>
  );
};

export default CartButton;
