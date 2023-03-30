import React from "react";
import Link from "next/link";
// components
import Topbar from "../Components/Homepage/Topbar";
import Banner from "../Components/Homepage/Banner";
import NewArrivals from "../Components/Homepage/NewArrivals";
import Products from "../Components/Homepage/Products";
import NewsLetter from "../Components/Homepage/NewsLetter";
import Promo from "../Components/Homepage/Promo";
import Footer from "../Components/Footer";
import Review from "../Components/Homepage/Review";

function HomePage() {
  return (
    <div className="homepage-main-con">
      {/* TOPBAR */}
      <Topbar />
      {/* BANNER */}
      <Banner />
      {/* <MyPage /> */}
      {/* NEW ARRIVALS */}
      <NewArrivals />
      {/* MAIN PRODUCT */}
      <Products />
      {/* SUBSCRIBE */}
      <NewsLetter />
      {/* PROMO */}
      <Promo />
      {/* REVIEWS */}
      <Review />
    </div>
  );
}

export default HomePage;
