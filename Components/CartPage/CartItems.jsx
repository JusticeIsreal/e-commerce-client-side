import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteCartItem, getSessionUser } from "../../Services/functions";
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

  return (
    <>
      <p className="cart-heading">CART SUMMARY</p>
      <div className="subtotal">
        <p>Subtotal</p>
        <h3> ₦ {totalAmount.toLocaleString()}</h3>
      </div>

      <div className="single-product">
        {userCart.map((item) => (
          <CartProducts
            key={item._id}
            {...item}
            // deleteCartItemm={deleteCartItemm}
          />
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
  productname,
  productnumber,
  productprice,
  quantity,
}) {
  // qty
  const [priceNumber, setPriceNumber] = useState(parseFloat(productprice));
  const [count, setCount] = useState(1);

  const addProductQTY = () => {
    const total = parseFloat(productprice) * count;
    setPriceNumber(total);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = async () => {
    setCount(count - 1);
    if (count <= 1) {
      setCount(1);
    }
  };
  useEffect(() => {
    addProductQTY();
  }, [count]);


  const deleteCart = async (_id) => {
    await deleteCartItem(_id);
  };

  return (
    <div className="product-con">
      <div className="cart-product-top">
        <div className="img-con">
          <img src={image[0]} alt="img" className="home-product-img" />
        </div>
        <div className="cart-product-lower">
          <div className="cart-product-lower-top">
            <h3>{productname}</h3>
            <p>₦ {priceNumber} </p>
            <span>{productnumber}</span>
          </div>
          <div className="cart-product-lower-lower">
            <p onClick={() => deleteCart(_id)}>
              <ImBin /> REMOVE
            </p>
            <div>
              {count < 1 ? (
                ""
              ) : (
                <FiMinusCircle
                  className="icon"
                  onClick={() => handleDecrement()}
                />
              )}
              <h3>{count}</h3>
              <FiPlusCircle
                className="icon"
                onClick={() => handleIncrement()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
