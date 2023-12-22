import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, HashNavigation, Navigation } from "swiper";
import { useSelector } from "react-redux";

const imgData1 = [
  {
    img: "https://res.cloudinary.com/divxqgoph/image/upload/v1690365116/shomvar/5cb01d96-eb55-4682-a381-eca05333d7f8_cjqftt.jpg",
  },
  {
    img: "https://res.cloudinary.com/divxqgoph/image/upload/v1690365108/shomvar/814bf69e-6292-41ba-a2a5-9a0f389ae70a_ik6t96.jpg",
  },
  {
    img: "https://res.cloudinary.com/divxqgoph/image/upload/v1690365084/shomvar/2340e4a0-1d21-4c92-b8ce-4e5951de999c_dox87o.jpg",
  },
];

const BannerSlider = () => {
  const { items: data } = useSelector((state) => state.banner);

  return (
    <div className="wrapper  mt-5 ">
      <div className="grid  gap-3">
        <div className="banner-slider-frame col-span-3 ">
          <div className="banner-slider">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={700}
              hashNavigation
              loop={true}
              modules={[Autoplay, Navigation, HashNavigation]}
              className="mySwiper h-full"
            >
              {data.map((banner) => (
                <div>
                  <SwiperSlide>
                    <div className="w-full  md:h-[21rem] h-[12rem] 2xl:h-[30rem] overflow-hidden">
                      <img
                        key={banner.id}
                        src={`${process.env.REACT_APP_URL}/public/uploads/slider/${banner?.slider}`}
                        alt={banner.alt}
                        className={` h-full  w-full  transition-opacity duration-500 object-cover `}
                      />
                    </div>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
