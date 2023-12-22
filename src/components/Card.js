import { currencyFormatter } from "../utils/currencyFormatter";
import { useDispatch } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import {
  addToSingleCart,
  addtoCart,
  removeAllFromCart,
} from "../features/products/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderNowModal from "./OrderNowModal";
const Card = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCartHandler = (product) => {
    dispatch(addtoCart(product));
    navigate("/checkout");
  };

  const [cartQuantity, setCartQuantity] = useState(1);
  const [modal, setModal] = useState(false);

  const handleBuyNow = () => {
    dispatch(removeAllFromCart());
    dispatch(addToSingleCart({ ...product, cartQuantity }));
    navigate("/checkout");
  };

  const handleClose = () => {
    setModal(!modal);
  };

  const handleModalOpen = () => {
    setModal(!modal);
  };

  return (
    <div className="flex flex-col  bg-white border-2 group-hover:border-[#C3161C] rounded-xl duration-300">
      <Link to={`/productdetails/${product?.id}`} className="">
        <div className="image-section p-2">
          <div className=" h-[12rem] md:h-[15rem] lg:h-[18rem] 2xl:[20rem] overflow-hidden">
            <img
              src={`${process.env.REACT_APP_URL}/uploads/product/${product?.photos}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="product-details  p-2">
          <div className=" hover:text-[#C3161C] duration-300">
            {product?.name?.substring(0, 12)}..
          </div>
          <div>{product?.unit_price}</div>
        </div>
      </Link>

      <div className="grid grid-cols-[60%_20%_20%] gap-2">
        <button
          onClick={handleModalOpen}
          className="flex py-1 items-center justify-center text-sm font-extralight border border-[#C3161C] text-[#C3161C] rounded-bl-xl"
        >
          অর্ডার করুন
        </button>
        {modal && (
          <>
            <OrderNowModal
              product={product}
              modal={modal}
              setModal={setModal}
              handleClose={handleClose}
            />
          </>
        )}

        <div className="text-[#C3161C] flex items-center justify-start">
          <AiOutlineHeart className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Card;
