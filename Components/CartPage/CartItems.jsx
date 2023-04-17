import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteCartItem, getSessionUser } from "../../Services/functions";
import { ImBin } from "react-icons/im";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

function CartItems({ triger, setTriger }) {
  const router = useRouter();
  const [localCart, setLocalCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    const fetchSessionUser = async () => {
      const userData = await getSessionUser(router);
      if (userData) {
        setUserCart(userData.user.cart);
      }
    };
    fetchSessionUser();
  }, [router, triger]);

  useEffect(() => {
    const totalArray = userCart?.map((item) => {
      const total = item.productprice * item.quantity;
      return { total };
    });

    const grandTotal = totalArray?.reduce(
      (accumulator, item) => accumulator + item.total,
      0
    );
    setTotalAmount(grandTotal);
  }, [router, userCart]);

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
            setTriger={setTriger}
            triger={triger}
            setTotalAmount={setTotalAmount}
            totalAmount={totalAmount}
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
  setTriger,
  triger,
  setTotalAmount,
  totalAmount,
  _id,
  image,
  productname,
  productnumber,
  productprice,
  quantity,
}) {
  // qty
  const [priceNumber, setPriceNumber] = useState(parseFloat(productprice));
  const [count, setCount] = useState(quantity);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    const newPrice = parseFloat(productprice) * newCount;
    const priceDiff = newPrice - priceNumber;
    setPriceNumber(newPrice);
    setTotalAmount(totalAmount + priceDiff);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      const newPrice = parseFloat(productprice) * newCount;
      const priceDiff = newPrice - priceNumber;
      setPriceNumber(newPrice);
      setTotalAmount(totalAmount + priceDiff);
    }
  };

  const deleteCart = async (_id) => {
    await setTriger(!triger);
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
                <FiMinusCircle className="icon" onClick={handleDecrement} />
              )}
              <h3>{count}</h3>
              <FiPlusCircle className="icon" onClick={handleIncrement} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
