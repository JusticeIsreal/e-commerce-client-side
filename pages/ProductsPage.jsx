import React from "react";

// COMPONENTS
import Topbar from "../Components/ProductPage/Topbar";
import Products from "../Components/ProductPage/Products";
import Footer from "../Components/Homepage/Footer";

function ProductsPage() {
  return (
    <div>
      {/* TOPBAR */}
      <Topbar />
      {/* PRODUCT DETAILS */}
      <Products />
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default ProductsPage;
