import React from "react";
import SectionTitle from "./SectionTitle";
import { useSelector } from "react-redux";
import {
  A11y,
  Navigation,
  HashNavigation,
  Pagination,
  Scrollbar,
  Grid,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/hash-navigation";

import Card from "./Card";

const ProductCard = () => {
  const { items: data } = useSelector((state) => state.products);

  return (
    <div className="wrapper mb-10">
      <SectionTitle title={"Show Our Product"} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {data?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
