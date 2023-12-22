import { configureStore } from "@reduxjs/toolkit";

import productReducer, {
  productFetching,
} from "../features/products/productSlice";
import cartReducer from "../features/products/cartSlice";
import categoryReducer, {
  categoryFetching,
} from "../features/products/categorySlice";
import bestSellingReducer, {
  bestSellingFetching,
} from "../features/products/bestSellingSlice";
import footerDetailsReducer, {
  footerDetails,
} from "../features/products/footerAboutSlice";

import bannerReducer, { bannerFatching } from "../features/banner/bannerSlice";

import logoReducer, { logoFatching } from "../features/logo/logoSlice";
import homeBannerReducer, {
  homeBannerFetching,
} from "../features/banner/homeBannerSlice";

import sizeAttributesReducer, {
  sizeAttributeFatching,
} from "../features/attributes/sizeAttributesSlice";

export const store = configureStore({
  reducer: {
    //reducer in here
    products: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    bestSell: bestSellingReducer,
    footerDetails: footerDetailsReducer,
    banner: bannerReducer,
    logo: logoReducer,
    homeBanner: homeBannerReducer,
    sizes: sizeAttributesReducer,
  },
});

store.dispatch(productFetching());
store.dispatch(categoryFetching());

store.dispatch(bestSellingFetching());
store.dispatch(footerDetails());

store.dispatch(bannerFatching());
store.dispatch(logoFatching());
store.dispatch(homeBannerFetching());
store.dispatch(sizeAttributeFatching());
