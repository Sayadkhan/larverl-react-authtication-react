import ReviewCard from "../components/ReviewCard";
import SectionTitle from "../components/SectionTitle";

const ReviewCardPage = ({ categoryProduct }) => {
  console.log(categoryProduct);
  return (
    <div className=" container mx-auto mb-5">
      <SectionTitle title={"Mehendi Review"} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {categoryProduct?.map((product) => (
          <>
            <div className=" overflow-hidden">
              <ReviewCard product={product} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ReviewCardPage;
