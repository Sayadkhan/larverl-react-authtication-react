import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Navigation,
  HashNavigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const CategoryCard = () => {
  const { items: data } = useSelector((state) => state.category);

  return (
    <div className="wrapper">
      <SectionTitle title={"Categories"} />
      <div className="w-full">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            HashNavigation,
            Autoplay,
          ]}
          // spaceBetween={25}
          // slidesPerView={6}

          hashNavigation
          // pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            330: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            450: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
        >
          {data?.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/categorypage/${category.id}`}
                className="category-card hover:shadow-md inline-block duration-300  rounded-md w-full h-full bg-white border border-r border-[#e2e2e2]"
                key={category.id}
              >
                <div className="category_image_container w-[80px] md:w-[120px] h-[90px] overflow-hidden flex items-center justify-center mx-auto mt-[15px]">
                  <img
                    src={`${process.env.REACT_APP_URL}/uploads/category/${category?.banner}`}
                    alt=""
                    className="object-cover overflow-hidden w-full"
                  />
                </div>
                <div className="category_content relative overflow-hidden">
                  <p className="text-center mt-[10px] text-[#212121] truncate">
                    {category?.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryCard;
