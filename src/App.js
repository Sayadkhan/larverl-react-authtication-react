import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import OrganicMehendi from "./pages/OrganicMehendi";
import NailMehendi from "./pages/NailMehendi";

import AddToCart from "./pages/AddToCart";
import TermsConditions from "./pages/TermsConditions";
import ReturnPolicy from "./pages/ReturnPolicy";
import SupportPolicy from "./pages/SupportPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import OrganicHennaPowder from "./pages/OrganicHennaPowder";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import SuccessPage from "./pages/SuccessPage";
import MehendiReview from "./pages/MehendiReview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndianMehendi from "./pages/IndianMehendi";
import MehendiArt from "./pages/MehendiArt";
import { useState } from "react";
import CartButton from "./components/CardButton";
import AddToCartCom from "./components/AddToCartCom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SellCondition from "./pages/SellCondition";
import ReviewCardPage from "./pages/ReviewCardPage";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import OrderNowModal from "./components/OrderNowModal";
import Card from "./components/Card";
import Login from "./pages/Login";

function App() {
  const { cartItems: data, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  // const [loading, setLoading] = useState(false);

  const [orderId, setOrderId] = useState("");
  const [state, setState] = useState(false);

  const handleAddToCart = () => {
    setState(!state);
  };

  return (
    <>
      <div className=" bg-[#F2F3F8] ">
        <div className="min-h-screen">
          <Navbar />
          <ToastContainer />

          <ScrollToTop>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path="/productdetails" element={<ProductDetails />} />
              <Route
                exact
                path="/productdetails/:id"
                element={<ProductDetails />}
              />
              {/* <Route element={<Card handleModalOpen={handleModalOpen} />} /> */}
              <Route exact path="/laptop/:id" element={<OrganicMehendi />} />
              <Route exact path="/desktop/:id" element={<NailMehendi />} />
              <Route
                exact
                path="/smart-watch/:id"
                element={<IndianMehendi />}
              />
              <Route path="monitor/:id" element={<OrganicHennaPowder />} />
              {/* <Route path="/mehendi-review/:id" element={<MehendiReview />} /> */}
              <Route path="/accessories/:id" element={<MehendiArt />} />
              <Route path="/categorypage" element={<CategoryPage />} />
              <Route path="/categorypage/:id" element={<CategoryPage />} />
              <Route path="/addtocart" element={<AddToCart />} />
              <Route
                path="/checkout"
                element={
                  data?.length > 0 ? (
                    <Checkout setOrderId={setOrderId} />
                  ) : (
                    <Navigate to={"/successpage"} />
                  )
                }
              />
              <Route
                path="/successpage"
                element={<SuccessPage orderId={orderId} />}
              />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/returnpolicy" element={<ReturnPolicy />} />
              <Route path="/supportpolicy" element={<SupportPolicy />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/about-us/:id" element={<About />} />
              <Route path="/contact-us/:id" element={<Contact />} />
              <Route path="/sellcondition" element={<SellCondition />} />
              {/* <Route path="/review" element={<ReviewCardPage />} /> */}
              <Route path="/blogs/:id" element={<BlogPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>

            <button
              onClick={handleAddToCart}
              className="fixed top-[45%] right-0 z-[9999]"
            >
              <CartButton data={data} cartTotalAmount={cartTotalAmount} />
            </button>
            {state && <AddToCartCom state={state} setState={setState} />}
            {/* {modla && <OrderNowModal />} */}
          </ScrollToTop>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
