import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

  const { items: data } = useSelector((state) => state.category);
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
    <div className="wrapper min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-2 md:gap-5">
        {categoryProduct?.length !== 0 ? (
          categoryProduct.map((product) => (
            <div className="overflow-hidden">
              <Card product={product} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No Product Found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
