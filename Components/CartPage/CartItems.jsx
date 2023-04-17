import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSessionUser } from "../../Services/functions";
import { ImBin } from "react-icons/im";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
function CartItems() {
  const router = useRouter();
  const [localCart, setLocalCart] = useState([]);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const fetchSessionUser = async () => {
      const userData = await getSessionUser(router);
      if (userData) {
        setUserCart(userData.user.cart);
      }
    };
    fetchSessionUser();
  }, [router]);

  //   console.log(localCart);
  //   console.log(userCart);

  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    const totalArray = userCart?.map((item) => {
      const total = item.productprice * 2;
      return { total };
    });

    const grandTotal = totalArray?.reduce(
      (accumulator, item) => accumulator + item.total,
      0
    );
    setTotalAmount(grandTotal);
  }, [router, totalAmount, userCart]);

  // output: [{ price: 10, quantity: 2, total: 12 }, { price: 5, quantity: 4, total: 9 }, { price: 8, quantity: 1, total: 9 }, { price: 12, quantity: 3, total: 15 }, { price: 6, quantity: 2, total: 8 }]
  console.log("totalamount:" + totalAmount); // output: 53
  return (
    <>
      <p className="cart-heading">CART SUMMARY</p>
      <div className="subtotal">
        <p>Subtotal</p>
        <h3> ₦ {totalAmount.toLocaleString()}</h3>
      </div>

      <div className="single-product">
        {userCart.map((item) => (
          <CartProducts key={item._id} {...item} />
        ))}

        <div className="checkout">
          <button>CHECKOUT (₦ {totalAmount.toLocaleString()})</button>
        </div>
      </div>
    </>
  );
}

export default CartItems;

function CartProducts({
  _id,
  image,
  productcategory,
  productclass,
  productdescription,
  productname,
  productnumber,
  productoldprice,
  productprice,
  quantity,
}) {
  return (
    <div className="product-con">
      <div className="cart-product-top">
        <div className="img-con">
          <img src={image[0]} alt="img" className="home-product-img" />
        </div>
        <div className="cart-product-lower">
          <div className="cart-product-lower-top">
            <h3>{productname}</h3>
            <p>
              ₦ {productprice * 2} <sup> ₦ {productoldprice}</sup>
            </p>
            <span>{productnumber}</span>
          </div>
          <div className="cart-product-lower-lower">
            <p>
              <ImBin /> REMOVE
            </p>
            <div>
              <FiMinusCircle className="icon" /> <h3>1</h3>{" "}
              <FiPlusCircle className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
