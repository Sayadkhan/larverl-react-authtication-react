import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import SectionTitle from "../components/SectionTitle";
import { useEffect, useState } from "react";

const MehendiReview = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  console.log(categoryProduct);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_URL}/api-categories/${id}`
        );
        const data = await res.json();
        setCategoryProduct(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="px-3 container mx-auto min-h-screen">
      <SectionTitle title={"Mehendi Review"} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 md:gap-5">
        {categoryProduct?.map((product) => (
          <>
            <div className="overflow-hidden">
              <ReviewCard product={product} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MehendiReview;
