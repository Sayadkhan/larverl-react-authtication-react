import { useSelector } from "react-redux";
import BannerImageCom from "./BannerImageCom";

const Banner = () => {
  const { items: data } = useSelector((state) => state.homeBanner);
  console.log(data);

  return (
    <div className="wrapper my-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-5">
        {data.map((data) => (
          <BannerImageCom data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
