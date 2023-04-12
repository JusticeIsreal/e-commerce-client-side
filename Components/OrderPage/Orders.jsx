import React, { useEffect, useState } from "react";

// icon
import { FaMoneyCheck } from "react-icons/fa";
import { getSessionUser } from "../../Services/functions";
import { useRouter } from "next/router";
function Orders() {
  // FETCHING SESSION USER NAME AND CART LENGTH

  const router = useRouter();
  const [userTransaction, setUserTransaction] = useState([]);
  useEffect(() => {
    const userName = async () => {
      const userData = await getSessionUser();
      setUserTransaction(userData?.user?.transaction);
    };
    userName();
  }, [router]);
  console.log(userTransaction);

  return (
    <div className="oders-con">
      <div className="order-page-top">
        <h1>TRANSACTIONS</h1>
        <div className="order-status">
          <p>All</p>
          <p>Processing</p>
          <p>Transit</p>
          <p>Delievered</p>
        </div>
      </div>
      <div className="each-order-con">
        {userTransaction.map((order) => (
          <TransactionReceipt key={order._id} {...order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

function TransactionReceipt({ timestamp, totalAmount, status }) {
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
        <p>{formattedTimestamp}</p>
        <p>{"Producct"}</p>
        <p>₦ {totalAmount.toLocaleString()}</p>
        <p>{status}</p>
      </div>
      <div className="order-payment-status">
        <p>{status}</p>
      </div>
    </div>
  );
}
