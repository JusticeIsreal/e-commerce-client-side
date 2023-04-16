import React from "react";
import Topbar from "../Components/Topbar";
import Image from "next/image";
import CartItems from "../Components/CartPage/CartItems";

function cart() {
  return (
    <div>
      <Topbar />

      <div className="cart-page-con">
        <CartItems />
      </div>
    </div>
  );
}

export default cart;
