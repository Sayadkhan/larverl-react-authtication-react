import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import BannerToow from "../components/BannerToow";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

import BannerSlider from "./BannerSlider";
import BestSelling from "./BestSelling";
import FeaturedProduct from "./FeaturedProduct";
import CountDown from "../components/CountDown";

// import ReviewCardPage from "./ReviewCardPage";

const Home = () => {
  // const [categoryProduct, setCategoryProduct] = useState([]);
  // console.log(categoryProduct);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${process.env.REACT_APP_MEHENDI_REVIEW_API}`);
  //       const data = await res.json();
  //       setCategoryProduct(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className=" p-4 md:p-0">
      <BannerSlider />
      <CategoryCard />
      <BestSelling />
      {/* <BannerToow /> */}
      {/* <ProductCard /> */}
      <Banner />
      {/* <CountDown targetDate={targetDate} /> */}
      <FeaturedProduct />
      {/* {<ReviewCardPage categoryProduct={categoryProduct} />} */}
    </div>
  );
};

export default Home;
