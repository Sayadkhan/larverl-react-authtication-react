import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductImageCarasol = ({ productImg, imageThamb }) => {
  return (
    <div className="w-auto object-cover">
      <Carousel
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        infiniteLoop={true}
        className="productCarousel"
      >
        <img src={productImg} alt="" className="w-auto h-auto object-cover " />

        {imageThamb?.map((image) => (
          <div className="w-full h-full overflow-hidden">
            <img
              src={`${process.env.REACT_APP_URL}/uploads/product/${image?.icon}`}
              alt="thamb pic"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImageCarasol;
