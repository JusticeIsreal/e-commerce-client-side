import React, { useEffect, useState } from "react";

// icon
import { FaMoneyCheck } from "react-icons/fa";
import { getSessionUser } from "../../Services/functions";
import { useRouter } from "next/router";
function Orders({ userTransaction }) {
  const orderStatus = ["All", "Processing", "Transit", "Delvered"];

  // state for category
  const [category, setCategory] = useState("All");

  // state for products
  const [products, setProducts] = useState(userTransaction);

  // filter products based on category
  useEffect(() => {
    if (category === "All") {
      setProducts(userTransaction);
    } else {
      setProducts(userTransaction.filter((item) => item.status === category));
    }
  }, [category, userTransaction]);
  console.log(userTransaction.filter((item) => item.status === "Open"));
  return (
    <div className="oders-con">
      <div className="order-page-top">
        <h1>TRANSACTIONS</h1>
        <div className="order-status">
          {orderStatus.map((btn, index) => (
            <p
              key={index}
              // className="category"
              className={`${
                btn === category ? "category active-category" : "category"
              }`}
              onClick={() => setCategory(btn)}
            >
              {btn}
            </p>
          ))}
        </div>
      </div>
      <div className="each-order-con">
        {products.map((order) => (
          <TransactionReceipt key={order._id} {...order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

function TransactionReceipt({
  timestamp,
  totalAmount,
  status,
  product,

  transactionstatus,
}) {
  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(timestamp);

  return (
    <div className="each-order">
      <div className="order-icon">
        <FaMoneyCheck />
      </div>
      <div className="order-details">
        <p className="timestamp">{formattedTimestamp}</p>
        <p className="productnames">
          {product.map((name) => name.productname + ",  ")}
        </p>
        <p className="productnames"> ₦ {totalAmount.toLocaleString()}</p>
        <p>
          Payment:{" "}
          <span
            style={{
              color: (() => {
                switch (transactionstatus) {
                  case "Pending":
                    return "#db504a";
                  case "Confirmed":
                    return "#3d91e6";
                  default:
                    return "#3d91e6";
                }
              })(),
            }}
          >
            {transactionstatus}
          </span>
        </p>
      </div>
      <div className="order-payment-status">
        <p
          style={{
            color: (() => {
              switch (status) {
                case "Processing":
                  return "#db504a";
                case "Transit":
                  return "#ffce26";
                case "Delivered":
                  return "#3d91e6";
                default:
                  return "#3d91e6";
              }
            })(),
          }}
        >
          {status}
        </p>
      </div>
    </div>
  );
}