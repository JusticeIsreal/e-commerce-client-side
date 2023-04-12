import React from "react";
import Topbar from "../Components/Topbar";
import Orders from "../Components/OrderPage/Orders";
import Footer from "../Components/Footer";

function orders() {
  return (
    <div className="order-page-main-con">
      <Topbar />
      <Orders />
      <Footer />
    </div>
  );
}
// orders.requireAuth = true;
export default orders;
