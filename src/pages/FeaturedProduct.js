import { useSelector } from "react-redux";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";

const FeaturedProduct = () => {
  const { items: data } = useSelector((state) => state.bestSell);
  console.log(data);
  return (
    <div className="wrapper mb-10">
      <SectionTitle title={"Featured Products"} />

      {/* {data?.length > 0 &&
        data?.map((product) => <Card key={product.id} product={product} />)} */}

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-5">
        {data?.length > 0 &&
          data.map((product) => <Card key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default FeaturedProduct;
