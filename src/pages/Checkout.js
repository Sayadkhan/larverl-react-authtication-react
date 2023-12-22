import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addtoCart,
  decreaseCart,
  getSubtotal,
  removeAllFromCart,
  removeFromCart,
  // removeFromCart,
} from "../features/products/cartSlice";

import { currencyFormatter } from "../utils/currencyFormatter";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

import Marquee from "react-fast-marquee";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems: data, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const [orderItem, setOrderItem] = useState(data);
  console.log(orderItem);
  const [response, setResponse] = useState(0);

  // console.log(JSON.stringify(orderItem).split(" "));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubtotal());
  }, [data, dispatch]);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    shipping_cost: "",
    shipping_type: "Cash On Delivery",
  });
  const [couponCode, setCouponCode] = useState("");

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleDecrease = (product) => {
    if (product?.cartQuantity > 1) {
      dispatch(decreaseCart(product));
    }
  };

  const handleIncrease = (product) => {
    dispatch(addtoCart(product));
  };

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };
  const applyCoupon = async () => {
    setCouponCode("");
    try {
      await fetch(`${process.env.REACT_APP_URL}/api-coupon-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupon: couponCode,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  let grand_total = response.discount
    ? cartTotalAmount + +formData.shipping_cost + -response.discount
    : cartTotalAmount + +formData.shipping_cost + 0;
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.shipping_type === "Cash On Delivery") {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/place-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            item: orderItem,
            shipping_cost: formData.shipping_cost,
            shipping_type: formData.shipping_type,
            grand_total,
          }),
        });

        if (!res.ok) throw new Error("Something Went Error");
        if (res.ok) {
          dispatch(removeAllFromCart());
          navigate("/login");
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    if (formData.shipping_type === "SSL Commerz") {
      const queryParams = new URLSearchParams({
        name: formData.name,
        item: JSON.stringify(orderItem),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        grand_total,
        shipping_type: formData.shipping_type,
        shipping_cost: formData.shipping_cost,
      });

      window.location.href = `${process.env.REACT_APP_PAYMENT_URL}/?${queryParams}`;
    }
  };

  return (
    <>
      <div className="checkout-page mt-10 mb-10 container mx-auto grid grid-cols-1 md:grid-cols-2 ">
        <form
          onSubmit={handleFormSubmit}
          className="billing-address border border-black bg-white"
        >
          <div className="billing-address flex flex-col gap-2 order-2 md:order-1 p-5">
            <div className="flex items-center justify-center bg-red-500 text-white">
              <Marquee direction="right" className="">
                <h2 className="text-2xl mt-5 md:mt-0 mb-5">
                  অর্ডার করতে নিচের ফর্মটি পূরণ করুন ...
                </h2>
              </Marquee>
            </div>
            <div className="form-control flex flex-col gap-2 mt-2">
              <label className="">আপনার নাম</label>
              <input
                required
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                className="px-3 py-2  rounded-md outline-none border focus:border-[#96680e] duration-300"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div className="form-control flex flex-col my-2">
              <label className="">আপনার মোবাইল নাম্বার</label>
              <input
                required
                type="tel"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                value={formData.phone}
                className="px-3 py-2 w-full rounded-md outline-none border focus:border-[#96680e] duration-300"
                placeholder="আপনার নাম্বার লিখুন"
              />
            </div>
            {/* <div className="form-control flex flex-col mb-3">
              <label className="mb-2">Email Address</label>
              <input
                className="px-3 py-2  rounded-md outline-none border focus:border-[#96680e] duration-300"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                type="email"
                placeholder="Enter Your Email..."
              />
            </div> */}

            <div className="form-control flex flex-col  mb-3 ">
              <label className="mb-2">আপনার ঠিকানা</label>
              <textarea
                required
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                value={formData.address}
                className="px-3 py-2 w-full rounded-md outline-none border focus:border-[#96680e] duration-300 resize-none"
                placeholder="আপনার ঠিকানা লিখুন"
              />
            </div>
            {/* <div className="form-control flex flex-col  mb-3 ">
            <label className="mb-2">Shipping Cost</label>
            <textarea
              required
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, shipping_cost: e.target.value })
              }
              value={formData.shipping_cost}
              className="px-3 py-2 w-full rounded-md outline-none border focus:border-[#96680e] duration-300 resize-none"
              placeholder="Enter Your shipping cost"
            />
          </div> */}
            <div className="form-control flex flex-col gap-2  mb-3">
              <select
                onChange={(e) =>
                  setFormData({ ...formData, shipping_cost: e.target.value })
                }
                className="px-3 py-2  rounded-md outline-none border focus:border-[#96680e] duration-300"
              >
                <option value="0">Select Area</option>
                <option value="60">Inside Dhaka(60)</option>
                {/* <option value="100">Dhaka Subcity(100)</option> */}
                <option value="100">Outside Dhaka(100)</option>
              </select>
            </div>

            <div className="form-control flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#C3161C] px-5 py-4 rounded-md text-2xl text-white hover:bg-transparent hover:text-slate-700 border hover:border-slate-700 duration-300"
              >
                অর্ডার কনফার্ম করুন
              </button>
            </div>
          </div>
        </form>

        <div className="order-details md:ml-40 ml-0 md:order-2 order-1 border border-black bg-white p-5">
          <div className="flex justify-center mb-5 underline underline-offset-8 text-red-400">
            <h2 className="text-2xl">আপনার অর্ডার</h2>
          </div>

          <div className="h-auto overflow-y-scroll order-details-container">
            {data?.map((product) => (
              <div
                key={product.id}
                className="cart-items  h-20  flex  items-start gap-4 mt-3 overflow-hidden"
              >
                <div className="cart-img aspect-square w-20 flex justify-center items-center overflow-hidden ">
                  <img
                    src={`${process.env.REACT_APP_URL}/uploads/product/${product?.photos}`}
                    className="w-full object-cover "
                    alt=""
                  />
                </div>
                <div className="cart-description w-full overflow-hidden ">
                  <div className="flex flex-col">
                    <p className="truncate">
                      {product?.name?.substring(0, 60)}...
                    </p>
                    <div className="flex gap-5 items-center my-3">
                      <div className="cart-price">
                        {product?.unit_price * product?.cartQuantity} ৳
                      </div>
                      <div>
                        <div className="">
                          <div className="counter flex">
                            <button
                              onClick={() => handleDecrease(product)}
                              className="h-10 w-10 bg-gray-100  border border-gray-300 active:bg-gray-700 active:text-gray-50"
                            >
                              -
                            </button>
                            <span className="h-10 w-10 bg-gray-100 flex justify-center items-center border border-gray-300">
                              {product?.cartQuantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(product)}
                              className="h-10 w-10 bg-gray-100 border border-gray-300 active:bg-gray-700 active:text-gray-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <button
                      className="text-base hover:text-red-500 duration-500 justify-center"
                      onClick={() => handleRemove(product)}
                    >
                      <RiDeleteBin6Line />
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shipping_Type  flex  md:flex-col lg:flex-row gap-5 ">
            {/* <div className="flex items-center gap-3">
              <input
                required
                onChange={(e) =>
                  setFormData({ ...formData, shipping_type: e.target.value })
                }
                type="checkbox"
                value="Cash On Delivery"
                name=""
                id=""
              />
              <span className="text-[0.9rem] text-[#212121]">
                Cash On Delivery
              </span>
            </div> */}
            {/* <div>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  checked
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping_type: e.target.value,
                    })
                  }
                  name="shipping_type"
                  value={"Cash On Delivery"}
                  className="peer sr-only"
                />
                <div className="w-full md:w-36 2xl:w-40  rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                  <img
                    src="./cash_on_delivery.jpg"
                    alt=""
                    className="w-full h-12 "
                  />
                </div>
              </label>
            </div> */}
            {/* <div>
              <label className="cursor-pointer relative">
                <input
                  type="radio"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping_type: e.target.value,
                    })
                  }
                  className="peer sr-only"
                  name="shipping_type"
                  value={"SSL Commerz"}
                />
                <div className=" w-full md:w-36 2xl:w-40  rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                  <p class="text-sm font-semibold uppercase text-gray-500">
                        Cash On Delivery
                      </p>
                  <img src="./ssl.jpg" alt="" className="w-full h-12 " />
                </div>
              </label>
            </div> */}
          </div>
          <div className="payment-summary flex flex-col gap-3 mt-5 ">
            <div className="sub-total flex justify-between">
              <h4 className="text-lg text-slate-400 font-semibold">
                Sub Total
              </h4>
              <span className="text-slate-700 ">{cartTotalAmount} ৳</span>
            </div>
            <div className="shipping flex justify-between">
              <h4 className="text-lg text-slate-400 font-semibold ">
                Shipping
              </h4>
              <span className="text-slate-700 ">
                {+formData.shipping_cost} ৳
              </span>
            </div>
            <div className="shipping flex justify-between">
              <h4 className="text-lg text-slate-400 font-semibold ">
                Discount
              </h4>
              <span className="text-slate-700 ">
                {response.discount ? +response.discount : 0} ৳
              </span>
            </div>
            <div className="bg-black h-1"></div>
            <div className="sub-total flex justify-between">
              <h4 className="text-lg text-slate-400 font-semibold">Total</h4>
              <span className="text-slate-700 font-semibold ">
                {grand_total} ৳
              </span>
            </div>
            {/* <div>
              <div className="flex   gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={handleCouponCodeChange}
                  className="px-3 py-2 xl:w-72  w-60  rounded-md outline-none border"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-[#0ea5e9] px-3  text-sm rounded-md"
                >
                  Apply Coupon
                </button>
              </div>
              {response.status === 200 && (
                <p className="text-green-500 text-xs mt-2">
                  {response.massage}
                </p>
              )}
              {response.status === 404 && (
                <p className="text-rose-500 text-xs mt-2">{response.massage}</p>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
