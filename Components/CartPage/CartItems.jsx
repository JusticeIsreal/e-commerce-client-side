import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSessionUser } from "../../Services/functions";

function CartItems() {
  const router = useRouter();
  const [localCart, setLocalCart] = useState([]);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const fetchSessionUser = async () => {
      const userData = await getSessionUser(router);
      if (userData) {
        setUserCart(userData.user.cart);
        setLocalCart(userData.storedCart);
      }
    };
    fetchSessionUser();
  }, [router]);

  //   console.log(localCart);
  console.log(userCart);
  return (
    <>
      <p className="cart-heading">CART SUMMARY</p>
      <div className="subtotal">
        <p>Subtotal</p>
        <h3>
          {userCart.map((item) => (
            <h4 key={item._id}>{item.totalAmount}</h4>
          ))}
        </h3>
      </div>
      <p className="cart-heading2">CART</p>

      <div>
        {userCart.map((item) => (
          <CartProducts key={item._id} />
        ))}
      </div>
    </>
  );
}

export default CartItems;

function CartProducts() {
  return (
    <div>
      <div>
        <div>{/* <Image /> */}</div>
        <div>
          <p>product name</p>
          <h3>Price</h3>
        </div>
      </div>

      <div>
        <p>icon remove item</p>
        <div>- 6 +</div>
      </div>
    </div>
  );
}
