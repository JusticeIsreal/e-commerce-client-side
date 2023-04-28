import React, { useEffect } from "react";
import Topbar from "../Components/Topbar";
import Image from "next/image";
import CartItems from "../Components/CartPage/CartItems";
import { deleteCartItem } from "../Services/functions";
import { useState } from "react";
import { useRouter } from "next/router";

function cart() {
  const router = useRouter();
  const [triger, setTriger] = useState(true);
  const [cartLength, setCartLength] = useState([]);

  return (
    <div className="cart-page">
      <Topbar triga={triger} />

      <div className="cart-page-con">
        <CartItems setTriger={setTriger} triger={triger} />
      </div>
    </div>
  );
}

export default cart;
