import React, { useCallback, useEffect, useState } from "react";
import ProductImageCarasol from "./ProductImageCarasol";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSingleCart,
  addtoCart,
  removeAllFromCart,
} from "../features/products/cartSlice";

const OrderNowModal = ({ product, modla, setModal, handleClose }) => {
  const { items: size } = useSelector((state) => state.sizes);

  const [singleProduct, setSingleProduct] = useState({});
  const [imageThamb, setImageThamb] = useState([]);
  const [color, setColor] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(1);

  // const [size, setSize] = useState([]);

  const [colorAtr, setColorAtr] = useState("");

  const [sizeAtr, setSizeAtr] = useState("");
  console.log(sizeAtr);

  const [response, setResponse] = useState({});

  const [isActive, setIsActive] = useState(false);

  // const [isError, setIsError] = useState(false);
  console.log(response);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const state = {
    button: "add_to_cart",
  };

  const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const clearFunction = () => {
    setResponse("");
  };

  const clearData = () => {
    setSizeAtr("");
  };

  // const navActive = ({ isActive }) => {
  //   return {
  //     color: isActive ? "#083344" : null,
  //     Font: isActive ? "font-bold" : null,
  //   };
  // };
  const handleSizeChange = async (event) => {
    // clearData();
    // setSizeAtr(event.target.value);
    console.log(sizeAtr);
    if (sizeAtr) {
      try {
        await fetch(`${process.env.REACT_APP_URL}/api-findproductstock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productid: product.id,
            variantid: sizeAtr,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            const newData = result;

            clearFunction();

            setResponse(newData);
          });

        // if (!res.ok) console.log("Something Went Error");
        // if (res.ok) {
        //   const price = await res.json();
        //   console.log(price);

        //   setResponse(price);
        // }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // useEffect(() => {
  //   if (!response) {
  //     setResponse();
  //   }
  // }, [response]);

  useEffect(() => {
    const singleProduct = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api-products/${id}`
      );
      return setSingleProduct(res.data);
    };
    singleProduct();
  }, [id]);

  useEffect(() => {
    const imageThambs = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api-thumb/${product?.id}}`
      );

      return setImageThamb(res.data);
    };
    imageThambs();
  }, [product?.id]);

  const valueChange = (e) => {
    setSizeAtr(e.target.value);
  };

  // size
  // useEffect(() => {
  //   const sizes = async () => {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_URL}/api-attribute/6`
  //     );

  //     return setSize(res.data);
  //   };
  //   sizes();
  // }, [product?.size]);

  // clolors
  // useEffect(() => {
  //   const colors = async () => {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_URL}/api-color/${product?.color}`
  //     );

  //     return setColor(res.data);
  //   };
  //   colors();
  // }, [product?.color]);

  const handleDecrease = useCallback(() => {
    setCartQuantity(cartQuantity === 1 ? 1 : (prev) => prev - 1);
    cartQuantity > 1 &&
      toast.warn("Quantity Decreased", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }, [cartQuantity]);

  const handleIncrease = useCallback(() => {
    setCartQuantity((prev) => prev + 1);
    toast.warn("Quantity Increased", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (state.button === "add_to_cart") {
      console.log(state.button);
      dispatch(addtoCart({ ...product, cartQuantity, colorAtr, sizeAtr }));
      setColorAtr(null);
      setSizeAtr(null);
    }
    if (state.button === "buy_now") {
      console.log(state.button);
      dispatch(removeAllFromCart());
      dispatch(
        addToSingleCart({
          ...product,
          cartQuantity,
          colorAtr,
          sizeAtr,
        })
      );
      navigation("/checkout");
    }
  };
  return (
    <>
      <div
        onClick={handleClose}
        className="bg-black/40   z-[9998]  fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden"
      ></div>
      <div className="p-2 z-[9999] bg-white  fixed  shadow-xl top-0 right-0 left-0 bottom-0 w-full h-auto mr-5  md:container md:mx-auto my-10 overflow-y-scroll">
        <div className="flex items-center justify-end">
          <button
            onClick={handleClose}
            className="my-2 flex items-end justify-end"
          >
            <RxCross1 />
          </button>
        </div>
        <div className="grid  lg:grid-cols-[40%_40%_20%] gap-5">
          <div className="product image h-auto lg:h-[40rem]">
            <div className="w-full h-full">
              <ProductImageCarasol
                productImg={`${process.env.REACT_APP_URL}/uploads/product/${product?.photos}`}
                imageThamb={imageThamb}
              />
            </div>
          </div>
          <div className="product-details flex flex-col gap-3  p-2">
            <div className="text-2xl font-semibold">{product?.name}</div>
            {/* size and color */}

            {/* product quentity */}

            <div className="relative w-full rounded-md overflow-hidden">
              <input
                type="number"
                value={cartQuantity}
                onChange={(e) => setCartQuantity(e.target.value)}
                className="w-full py-3 text-center border  border-red-200"
              />

              <button
                onClick={() => handleDecrease(product)}
                className="absolute top-0 bottom-0 left-0 flex items-center justify-center bg-red-600 p-5 text-white"
              >
                <span>
                  <BsFillCartDashFill />
                </span>
              </button>
              <button
                onClick={() => handleIncrease(product)}
                className="absolute top-0 bottom-0 right-0 flex items-center justify-center bg-red-600 p-5 text-white"
              >
                <span>
                  <BsFillCartPlusFill />
                </span>
              </button>
            </div>

            {/* add to cart and bye now button */}

            <form onSubmit={handleAddToCart}>
              <div className="flex flex-col ">
                <>
                  <div className="flex flex-col  gap-5 mb-5">
                    {size?.length > 0 && (
                      <div className="color-atr flex items-center justify-start gap-7 mb-2">
                        <h4 className="text-2xl">
                          <span>Available size</span>
                          <span>:</span>
                        </h4>
                        <div className="flex flex-wrap items-center justify-start gap-4">
                          {size?.map((s) => (
                            <span
                              key={s.id}
                              className={`flex border-2 text-2xl hover:border-red-600 duration-300`}
                            >
                              <input
                                type="button"
                                id={s.id}
                                value={s.value}
                                checked={sizeAtr === s.value}
                                onMouseEnter={valueChange}
                                onClick={handleSizeChange}
                                // style={{
                                //   backgroundColor: isActive ? "#fff" : "",
                                //   color: isActive ? "#DC2626" : "",
                                // }}
                                className={`w-10 hover:cursor-pointer hover:border-red-700`}
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* {color?.length > 0 && (
                      <div className="color-atr flex items-center justify-start  gap-3 mb-2">
                        <h4 className="text-2xl  ">
                          <span>Available Color</span>
                          <span>:</span>
                        </h4>
                        <div className="flex flex-wrap items-center justify-start gap-4">
                          {color?.map((s) => (
                            <span key={s.id} className="flex">
                              <input
                                type="checkbox"
                                value={s.value}
                                checked={colorAtr === s.value}
                                onChange={handleColorChange}
                                onClick={responsData}
                                className="w-10"
                              />
                              <label className="">{s.value}</label>
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}

                    <div className="flex gap-5 items-center">
                      <h4 className="text-2xl">Price :</h4>
                      <span className="text-red-500 font-normal text-3xl">
                        {response?.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-5">
                    <button
                      // onClick={handleAddToCart}
                      type="submit"
                      name="add_to_cart"
                      onClick={() => (state.button = "add_to_cart")}
                      className="bg-red-600 hover:bg-[#3A3A3A] p-4 w-full rounded-md  text-white duration-300"
                    >
                      Add to cart
                    </button>
                    <button
                      // onClick={handleAddToCart}
                      type="submit"
                      name="buy_now"
                      disabled={
                        color?.length > 0 &&
                        size?.length > 0 &&
                        (!colorAtr || !sizeAtr)
                      }
                      className={` ${
                        colorAtr && sizeAtr
                          ? "bg-red-600 hover:bg-[#3A3A3A]"
                          : "bg-red-600 cursor-not-allowed"
                      }    p-4 w-full rounded-md  text-white duration-300 disabled`}
                      onClick={() => (state.button = "buy_now")}
                    >
                      Buy Now
                    </button>
                  </div>
                </>
              </div>
            </form>

            {/* short descriptin */}

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderNowModal;
