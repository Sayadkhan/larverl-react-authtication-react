// import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

// import { removeAllFromCart, getSubtotal } from "../features/products/cartSlice";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../utils/currencyFormatter";
import {
  addtoCart,
  decreaseCart,
  removeFromCart,
} from "../features/products/cartSlice";

// import CartButton from "./CartButton";
const AddToCartCom = ({ state, setState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleRemove = (product) => {
  //   dispatch(removeFromCart(product));
  // };

  const handleDecrease = (product) => {
    if (product?.cartQuantity > 1) {
      dispatch(decreaseCart(product));
    } else {
    }
  };

  const handleIncrease = (product) => {
    dispatch(addtoCart(product));
  };
  const { cartItems: data } = useSelector((state) => state.cart);

  const handleClose = () => {
    setState(!state);
  };

  const handleCheckOut = () => {
    navigate("/checkout");
    setState(!state);
  };

  return (
    <div
      className={`addtocart-wrapper hidden md:block
      p-2 z-[9999] bg-white h-[100vh] w-[25rem] fixed right-0 shadow-xl top-0`}
    >
      <div className="addtocart-sidebar h-[91vh]  bg-white overflow-y-scroll">
        <div className="cart-uperside flex justify-between items-center border-b p-3 hover:cursor-pointer">
          <h3 className="text-3xl">Cart</h3>
          <div className="bg-slate-200 rounded-full hover:bg-rose-500 duration-300">
            <IoIosClose onClick={handleClose} className="text-[1.5rem]" />
          </div>
        </div>
        <div>
          {data?.length > 0 ? (
            <div className="flex flex-col">
              {data?.map((product) => (
                <div key={product.id} className="flex">
                  <div className="cart-items  h-30  flex  items-center gap-4 p-3 overflow-hidden">
                    <div className="counter bg-gray-100  rounded-md flex flex-col">
                      <button
                        onClick={() => handleIncrease(product)}
                        className="h-5 w-5    flex items-center justify-center active:bg-gray-700 active:text-gray-50"
                      >
                        +
                      </button>
                      <span className="h-5 w-5  flex justify-center items-center ">
                        {product?.cartQuantity}
                      </span>
                      <button
                        onClick={() => handleDecrease(product)}
                        className="h-5 w-5 flex items-center justify-center  active:bg-gray-700 active:text-gray-50"
                      >
                        -
                      </button>
                    </div>
                    <div className="cart-img h-20 w-20 flex justify-center items-center overflow-hidden">
                      <img
                        src={`${process.env.REACT_APP_URL}/uploads/product/${product?.photos}`}
                        className="w-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="cart-description w-30 overflow-hidden ">
                      <div className="flex flex-col">
                        <p className="truncate">
                          {product?.name?.substring(0, 20)}...
                        </p>
                        <div className="cart-price">
                          {currencyFormatter(product?.unit_price)}
                        </div>
                      </div>
                      <div className="hover:text-rose-500 duration-300">
                        <RiDeleteBin6Line
                        // onClick={() => handleRemove(product)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-[50%]">
              <div className="flex items-center justify-center">
                <svg width="140" height="176" viewBox="0 0 231.91 292">
                  <defs>
                    <linearGradient
                      id="linear-gradient"
                      x1="1"
                      y1="0.439"
                      x2="0.369"
                      y2="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#0d93d1"></stop>
                      <stop offset="1" stop-color="#0d93d1"></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="no_cart_in_bag_2"
                    data-name="no cart in bag 2"
                    transform="translate(-1388 -351)"
                  >
                    <ellipse
                      id="Ellipse_2873"
                      data-name="Ellipse 2873"
                      cx="115.955"
                      cy="27.366"
                      rx="115.955"
                      ry="27.366"
                      transform="translate(1388 588.268)"
                      fill="#ddd"
                      opacity="0.25"
                    ></ellipse>
                    <path
                      id="Path_18691"
                      data-name="Path 18691"
                      d="M29.632,0H170.368A29.828,29.828,0,0,1,200,30.021V209.979A29.828,29.828,0,0,1,170.368,240H29.632A29.828,29.828,0,0,1,0,209.979V30.021A29.828,29.828,0,0,1,29.632,0Z"
                      transform="translate(1403 381)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Rectangle_1852"
                      data-name="Rectangle 1852"
                      d="M30,0H170a30,30,0,0,1,30,30v0a30,30,0,0,1-30,30H12.857A12.857,12.857,0,0,1,0,47.143V30A30,30,0,0,1,30,0Z"
                      transform="translate(1403 381)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Rectangle_1853"
                      data-name="Rectangle 1853"
                      d="M42,0H158a42,42,0,0,1,42,42v0a18,18,0,0,1-18,18H18A18,18,0,0,1,0,42v0A42,42,0,0,1,42,0Z"
                      transform="translate(1403 381)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Path_18685"
                      data-name="Path 18685"
                      d="M446.31,246.056a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,246.056Zm0-53.294A23.3,23.3,0,1,0,469.9,216.056,23.471,23.471,0,0,0,446.31,192.762Z"
                      transform="translate(1056.69 164.944)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Path_18686"
                      data-name="Path 18686"
                      d="M446.31,375.181a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,375.181Zm0-53.294A23.3,23.3,0,1,0,469.9,345.181,23.471,23.471,0,0,0,446.31,321.887Z"
                      transform="translate(1057.793 95.684)"
                      fill="#0d93d1"
                    ></path>
                    <circle
                      id="Ellipse_2874"
                      data-name="Ellipse 2874"
                      cx="28.689"
                      cy="28.689"
                      r="28.689"
                      transform="translate(1473.823 511.046)"
                      fill="#0d93d1"
                    ></circle>
                    <circle
                      id="Ellipse_2875"
                      data-name="Ellipse 2875"
                      cx="15.046"
                      cy="15.046"
                      r="15.046"
                      transform="translate(1481.401 547.854) rotate(-45)"
                      fill="#0d93d1"
                    ></circle>
                    <path
                      id="Path_18687"
                      data-name="Path 18687"
                      d="M399.71,531.27a71.755,71.755,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392,78.392,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z"
                      transform="translate(1060.579 -35.703)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Path_18688"
                      data-name="Path 18688"
                      d="M412.913,527.786a78.419,78.419,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.785,71.785,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z"
                      transform="translate(1060.566 -35.704)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Path_18689"
                      data-name="Path 18689"
                      d="M583.278,527.786a78.417,78.417,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.768,71.768,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z"
                      transform="translate(970.304 -35.704)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Path_18690"
                      data-name="Path 18690"
                      d="M570.075,531.27a71.77,71.77,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407,78.407,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z"
                      transform="translate(970.318 -35.703)"
                      fill="#0d93d1"
                    ></path>
                    <path
                      id="Path_18692"
                      data-name="Path 18692"
                      d="M301.243,287.464a19.115,19.115,0,0,1,8.071,9.077,19.637,19.637,0,0,1,1.6,7.88v26.085a19.349,19.349,0,0,1-9.672,16.957c-10.048-6.858-16.544-17.742-16.544-30S291.2,294.322,301.243,287.464Z"
                      transform="translate(1292.301 101.536)"
                      fill="url(#linear-gradient)"
                    ></path>
                    <path
                      id="Path_18693"
                      data-name="Path 18693"
                      d="M294.371,287.464a19.115,19.115,0,0,0-8.071,9.077,19.637,19.637,0,0,0-1.6,7.88v26.085a19.349,19.349,0,0,0,9.672,16.957c10.048-6.858,16.544-17.742,16.544-30S304.419,294.322,294.371,287.464Z"
                      transform="translate(1118.301 101.536)"
                      fill="url(#linear-gradient)"
                    ></path>
                  </g>
                </svg>
              </div>
              <p className="text-2xl text-center">No Product Found</p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleCheckOut}
        to={"/checkout"}
        className="  bg-[#C3161C] flex justify-center  text-white w-full px-5 py-2 items-center rounded-full"
      >
        Checkout <span>({data?.length})</span>
      </button>
    </div>
  );
};

export default AddToCartCom;
