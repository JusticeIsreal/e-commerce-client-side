import React from "react";

function Orders() {
  return (
    <div class="oders-con">
      <div className="order-page-top">
        <h1>TRANSACTIONS</h1>
        <div className="order-status">
          <p>Pending</p>
          <p>Processing</p>
          <p>Transit</p>
          <p>Delievered</p>
        </div>
      </div>
      <TransactionReceipt />
    </div>
  );
}

export default Orders;

function TransactionReceipt() {
  return (
    <div className="each-order">
      <div className="order-icon">icon</div>
      <div className="order-details">
        <p>Date</p>
        <p>Product</p>
        <p>Total</p>
        <p>payment status</p>
      </div>
      <div className="order-payment-status">
        <p>status</p>
      </div>
    </div>
  );
}
