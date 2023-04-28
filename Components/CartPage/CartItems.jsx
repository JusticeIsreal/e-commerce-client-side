import { useRouter } from "next/router";
import PayForm from "../PayForm";
import React, { useContext, useEffect, useState } from "react";
import { deleteCartItem, getSessionUser } from "../../Services/functions";
import { ImBin } from "react-icons/im";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { CartQuantityContext } from "../../pages/_app";
import { TiArrowBack } from "react-icons/ti";

function CartItems({ triger, setTriger }) {
  const router = useRouter();
  const [userCart, setUserCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [productsArray, setProductsArray] = useState([]);

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

  useEffect(() => {
    const newProductsArray = userCart?.map((item) => {
      return {
        productname: item.productname,
        productprice: item.productprice,
        quantity: item.quantity,
      };
    });

    setProductsArray(newProductsArray);
  }, [userCart]);

  // PAY FUNCTION
  const [loginTriger, setLoginTriger] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const PayNow = async () => {
    const triger = await getSessionUser();
    if (!triger) {
      return setLoginTriger(true);
    }
    setPayModal(true);
  };

  // go back
  function goBack() {
    router.back();
  }
  return (
    <>
      {payModal && (
        <PayForm
          setLoginTriger={setLoginTriger}
          setPayModal={setPayModal}
          productsArray={productsArray}
          totalAmount={totalAmount}
          // priceNumber={priceNumber}
        />
      )}
      <button onClick={goBack} className="go-back">
        <TiArrowBack />
        Back
      </button>
      <p className="cart-heading">CART SUMMARY</p>
      <div className="subtotal">
        <p>Subtotal</p>
        <h3> ₦ {totalAmount.toLocaleString()}</h3>
        <div className="checkout" onClick={() => PayNow()}>
          <button>CHECKOUT (₦ {totalAmount.toLocaleString()})</button>
        </div>
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
            setProductsArray={setProductsArray}
            productsArray={productsArray}
          />
        ))}
        <div className="checkout" onClick={() => PayNow()}>
          <button>CHECKOUT (₦ {totalAmount.toLocaleString()})</button>
        </div>
      </div>
    </>
  );
}

export default CartItems;

function CartProducts({
  setProductsArray,
  productsArray,
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
  const setCartQty = useContext(CartQuantityContext).setCartQty;

  const updateProductsArray = (currentState) => {
    const index = currentState.findIndex(
      (item) => item.productname === productname
    );
    if (index >= 0) {
      const newCount = count;
      const newPriceNumber = parseFloat(productprice) * newCount;
      const priceDiff = newPriceNumber - currentState[index].productprice;
      const newProduct = {
        ...currentState[index],
        quantity: newCount,
        productprice: newPriceNumber,
      };
      currentState.splice(index, 1, newProduct);
      setProductsArray([...currentState]);
      setTotalAmount(totalAmount + priceDiff);
    } else {
      const newProduct = {
        productname,
        productprice: priceNumber,
        quantity: count,
      };
      setProductsArray([...currentState, newProduct]);
      setTotalAmount(totalAmount + priceNumber);
    }
  };

  useEffect(() => {
    updateProductsArray(productsArray);
  }, [count]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  const deleteCart = async (_id) => {
    await setTriger(!triger);
    const delRes = await deleteCartItem(_id);
    if (delRes) {
      const userData = await getSessionUser();
      setCartQty(userData?.user.cart.length);
    }
  };

  return (
    <div className="product-con">
      <div className="cart-product-top">
        <div className="img-con">
          <img src={image[0]} alt="img" className="home-product-img" />
        </div>
        <div className="cart-product-lower">
          <div className="cart-product-lower-top">
            <h4>{productname}</h4>
            <p>₦ {priceNumber.toLocaleString()} </p>
            <span>{productnumber}</span>
          </div>
          <div className="cart-product-lower-lower">
            <p onClick={() => deleteCart(_id)}>
              <ImBin /> <sub>REMOVE</sub>
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
