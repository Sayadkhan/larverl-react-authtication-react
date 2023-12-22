import React from "react";

const ReviewCard = ({ product }) => {
  return (
    <div className="container mx-auto px-2 mb-5">
      <div className="img overflow-hidden rounded-md">
        <img
          src={`${process.env.REACT_APP_URL}/uploads/product/${product?.photos}`}
          alt=""
          className=" h-48 w-full md:h-96 lg:w-full lg:h-96"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
