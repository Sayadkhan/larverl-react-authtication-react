import { useState } from "react";

import ReactImageMagnify from "react-image-magnify";

const ProductDetailsCarousel = ({ singleProduct }) => {
  let productImg = `${process.env.REACT_APP_PRODUCTS_IMAGE_URL}/${singleProduct.product?.photos}`;
  // const [img] = useState({
  //   img1: productImg,
  // });

  const [activeImg, setActiveImg] = useState(productImg);
  return (
    <div>
      {/* left start */}
      {singleProduct?.status && (
        <div className=" flex md:flex-row flex-col-reverse gap-3">
          <div className="flex flex-row md:flex-col gap-3   items-center">
            <div
              className={`w-14 h-14 ${
                activeImg === productImg ? "border-2 border-[#b47a06]  " : null
              }  overflow-hidden flex items-center justify-center `}
            >
              <img
                onClick={() => setActiveImg(productImg)}
                src={productImg}
                alt="img"
                className="w-full"
              />
            </div>
          </div>
          <div>
            {activeImg && (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Image",
                    src: activeImg,
                    width: 400,
                    height: 300,
                  },
                  largeImage: {
                    src: activeImg,
                    width: 1200,
                    height: 900,
                  },
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCarousel;
