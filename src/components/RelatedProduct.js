import React, { useEffect, useState } from "react";
import Card from "./Card";

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
import SectionTitle from "./SectionTitle";

const RelatedProduct = ({ singleProduct }) => {
  // const { items: data } = useSelector((state) => state.relatedProduct);
  const [relatedProduct, setRelatedProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_URL}/relatedproductdata/${singleProduct?.product?.id}`
        );
        const data = await res.json();
        setRelatedProduct(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [singleProduct?.product?.id]);

  return (
    <>
      {relatedProduct?.length > 0 && (
        <div>
          <SectionTitle title={"Related Product"} />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {relatedProduct?.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProduct;
