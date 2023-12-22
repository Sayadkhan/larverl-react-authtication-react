import { useSelector } from "react-redux";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

import {
  A11y,
  Navigation,
  HashNavigation,
  Pagination,
  Scrollbar,
  Grid,
  Autoplay,
  Parallax,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/hash-navigation";

const BestSelling = () => {
  const { items: data } = useSelector((state) => state.products);

  return (
    <div className="wrapper">
      <SectionTitle title={"Best Selling"} />

      <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {data?.length > 0 &&
          data.map((product) => <Card key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default BestSelling;
