import React from "react";

const BannerImageCom = ({ data }) => {
  return (
    <div className="banner-image w-full h-52 md:h-80  rounded-md overflow-hidden ">
      <img
        key={data.id}
        src={`${process.env.REACT_APP_URL}/public/uploads/homebanner/${data?.banner}`}
        className="h-full w-full object-cover"
        alt=""
      />
    </div>
  );
};

export default BannerImageCom;
