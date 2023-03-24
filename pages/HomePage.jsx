import React from "react";

// components
import Topbar from "../Components/Topbar";
import Banner from "../Components/Banner";
import NewArrivals from "../Components/NewArrivals";
import Products from "../Components/Products";
import NewsLetter from "../Components/NewsLetter";
import Promo from "../Components/Promo";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <div className="homepage-main-con">
      {/* TOPBAR */}
      <Topbar />
      {/* BANNER */}
      <Banner />
      {/* NEW ARRIVALS */}
      <NewArrivals />
      {/* MAIN PRODUCT */}
      <Products />
      {/* SUBSCRIBE */}
      <NewsLetter />
      {/* PROMO */}
      <Promo />
      {/* REVIEWS */}
      <Footer />
      {/* FOOTER */}
    </div>
  );
}

export default HomePage;
