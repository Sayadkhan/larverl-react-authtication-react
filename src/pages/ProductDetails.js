import React, { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import ProductDetailsCarousel from "../components/ProductDetailsCarousel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { currencyFormatter } from "../utils/currencyFormatter";
import { BsMessenger, BsPlus } from "react-icons/bs";
import RelatedProduct from "../components/RelatedProduct";
import {
  addToSingleCart,
  removeAllFromCart,
} from "../features/products/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../components/SectionTitle";
import ProductImageCarasol from "../components/ProductImageCarasol";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

// components start
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { items: data } = useSelector((state) => state.products);
  const { items: size } = useSelector((state) => state.sizes);

  const [singleProduct, setSingleProduct] = useState({});
  // console.log(singleProduct);

  const [color, setColor] = useState([]);

  // const [size, setSize] = useState([]);
  // console.log(color);

  // const [colorAtr, setColorAtr] = useState("");

  const [sizeAtr, setSizeAtr] = useState("");
  // console.log(sizeAtr);
  const [isActive, setIsActive] = useState(false);


  const [receivedData, setReceivedData] = useState({});
  console.log(receivedData);

  // console.log(receivedData);

  const [cartQuantity, setCartQuantity] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const singleProduct = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api-products/${id}`
      );
      return setSingleProduct(res.data);
    };
    singleProduct();
  }, [id]);

  const clearFunction = () => {
    setReceivedData("");
  };

  const handleSizeChange = async (e) => {

    if (sizeAtr) {
      try {
        await fetch(`${process.env.REACT_APP_URL}/api-findproductstock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productid: singleProduct.product.id,
            variantid: sizeAtr,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            const newData = result;
            // console.log(newData);


            clearFunction();   
            setReceivedData(newData);
            setIsActive(current => !current);
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

  // size
  // useEffect(() => {
  //   const sizes = async () => {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_URL}/api-size/${singleProduct?.product?.size}`
  //     );

  //     return setSize(res.data);
  //   };
  //   sizes();
  // }, [singleProduct?.product?.size]);

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
  const handleAddToCart = () => {
    dispatch(addToSingleCart({ ...singleProduct.product, cartQuantity }));
  };
  const handleBuyNow = () => {
    dispatch(removeAllFromCart());
    dispatch(
      addToSingleCart({
        ...singleProduct.product,
        cartQuantity,
        sizeAtr,
      })
    );
    navigate("/checkout");
  };

  // const valueChange = (e) => {
  //   setSizeAtr(e.target.value);
  // };

  return (
    <div className="wrapper">
      <div className="grid grid-cols-2 md:grid-cols-9 gap-10">
        <div className="left image col-span-2  md:col-span-9 lg:col-span-3">
          <div>
            <img
              src={`${process.env.REACT_APP_URL}/uploads/product/${singleProduct?.product?.photos}`}
              alt="pic"
            />
          </div>
        </div>
        <div className="right flex flex-col gap-8 col-span-2  md:col-span-9  lg:col-span-6">
          <div className="font-semibold text-lg lg:text-3xl">
            {singleProduct?.product?.name}
          </div>

          {/* <div className="flex gap-5">
            {color?.map((color) => (
              <div key={color?.id} className="flex gap-3">
                <label>
                  <input
                    onChange={(e) => setColorAtr(e.target.value)}
                    required
                    className="px-3 py-2  rounded-md outline-none border focus:border-[#96680e] duration-300"
                    value={color?.value}
                    name="color"
                    type="radio"
                  />
                  <div>{color?.value}</div>
                </label>
              </div>
            ))}
          </div> */}
          <div className="flex flex-wrap items-center justify-start gap-4">
            {size?.map((s) => (
              <span
                key={s.id}
                className={`flex`}
              >
                <input
                  type="radio"
                  id={s.id}
                  value={s.value}
                  checked={sizeAtr === s.value}
                  onMouseEnter={(e) => setSizeAtr(e.target.value)}
                  onClick={handleSizeChange}
                  // style={{
                  //   backgroundColor: isActive ? 'salmon' : '',
                  //   color: isActive ? 'white' : '',
                  // }}
                  className={`w-10 hover:cursor-pointer border-2 hover:border-red-700  border-white `}
                  // className="w-10"
                />
              </span>
            ))}
          </div>

          <div className="font-medium text-3xl">
            {+receivedData.price * cartQuantity} ৳
          </div>

          <div className="flex gap-3">
            <span className="inline-block text-slate-600/50 text-[0.9rem] font-medium  uppercase items-center">
              Quantity :
            </span>
            <div className="flex items-center gap-4 ">
              <button
                className=" bg-slate-500/30 rounded-full flex justify-center items-center font-semibold text-xs h-5 w-5 hover:bg-[#0ea5e9] hover:text-white duration-500"
                onClick={() => handleDecrease(singleProduct?.product)}
              >
                <AiOutlineMinus />
              </button>
              <span>{cartQuantity}</span>
              <button
                className=" bg-slate-500/30 h-5 w-5  rounded-full flex justify-center items-center hover:bg-[#0ea5e9] hover:text-white duration-500"
                onClick={() => handleIncrease(singleProduct?.product)}
              >
                <BsPlus />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-white">
            <button
              onClick={handleBuyNow}
              className="w-full py-3 col-span-2 px-5 bg-[#C3161C] flex items-center justify-center"
            >
              <span className="text-3xl">অর্ডার করুন।</span>
            </button>

            {/* <button
              onClick={handleAddToCart}
              className="w-full bg-[#FA5303] py-3 px-5 flex items-center justify-center"
            >
              Add to Cart
            </button> */}

            <a
              className="w-full py-2 px-5 bg-blue-500 hover:bg-[#ED423E] duration-300 col-span-2 flex flex-col items-center justify-center"
              href="tel://+8801878206101"
            >
              <span>অর্ডার অথবা কল করতে ক্লিক করুন </span>
              <span>(+8801878206101)</span>
            </a>

            <Link
              to={`https://www.google.com`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-5 bg-blue-500 hover:bg-[#ED423E] duration-300 col-span-2 flex flex-col items-center justify-center"
            >
              <span>বিস্তারিত জানতে মেসেজ করুন</span>
              <span className="text-xl">
                <BsMessenger />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="details">
        <SectionTitle title={"Discription"} />

        <div>
          <span>{singleProduct?.product?.short_description}</span>
        </div>
      </div>
      <div className="mb-10">
        <RelatedProduct singleProduct={singleProduct} />
      </div>
    </div>
  );
};

export default ProductDetails;
