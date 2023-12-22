import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";

import Card from "../components/Card";

const OrganicMehendi = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

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
    <div className="px-3 container mx-auto mb-10 ">
      <SectionTitle title={"Laptops"} />
      {categoryProduct?.length > 0 && (
        <>
          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-5 ">
            {categoryProduct?.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrganicMehendi;
