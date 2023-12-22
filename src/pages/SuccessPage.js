import React from "react";
// import { AiFillCheckCircle } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen wrapper my-20 flex justify-center">
      <div className="text-center w-full lg:w-[50rem] flex flex-col gap-5 items-center">
        <div className="text-white flex items-center justify-center bg-[#70C233] w-32 h-32 rounded-full">
          <span className="text-6xl">
            <TiTick />
          </span>
        </div>
        {/* <h2 className="font-medium text-xl">Your Order Id: {orderId}</h2> */}
        <p className="my-3 text-lg">
          আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে , আমাদের কাস্টমার কেয়ার
          প্রতিনিধি আপনাকে ফোন করে শীগ্রয় আপনার অর্ডার কনফার্ম করবে। <br />
          ধন্যবাদ
        </p>
        <Link
          to={"/"}
          className="bg-transparent border-2 border-[#70C233] text-[#70C233] h-12 w-full lg:w-72 hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
        >
          continue shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
