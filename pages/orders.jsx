import React from "react";
import Topbar from "../Components/Topbar";
import Orders from "../Components/OrderPage/Orders";

function orders() {
  return (
    <div className="order-page-main-con">
      <Topbar />
      <Orders />
    </div>
  );
}
// orders.requireAuth = true;
export default orders;
