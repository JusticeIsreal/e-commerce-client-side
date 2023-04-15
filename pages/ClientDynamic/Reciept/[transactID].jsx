import axios from "axios";
import JsBarcode from "jsbarcode";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  transactionStatus,
  singleTransactionFetcher,
} from "../../../Services/functions";
import useSWR from "swr";
import Loader from "../../../Components/Loader";
const API = "http://localhost:1234/api/v1/transaction/getsingletransaction";
function transactionrecipt() {
  const router = useRouter();
  const { transactID } = router.query;
  const {
    data: userData,
    isLoading,
    error,
  } = useSWR(transactID ? transactID : null, singleTransactionFetcher);

  // GENERATE BAR CODE WITH PRODUCT ID
  const barcodeRef = useRef(null);
  useEffect(() => {
    if (barcodeRef.current) {
      // Set the barcode format to CODE128
      JsBarcode(barcodeRef.current, "1234567890", { format: "QRCode" });
    }
  }, [barcodeRef.current]);

  // FETCH TRANSACTION STATUS

  useEffect(() => {
    async function fetchSessionUser() {
      if (userData) {
        await transactionStatus(userData && userData, transactID && transactID);
      }
    }
    fetchSessionUser();
  }, [userData, router, transactID]);

  return (
    <div className="receipt-main-con">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="receipt-con">
          <h3>Transaction Receipt</h3>
          <p>Order Ref: {userData?.paystackRef}</p>
          <p>
            {userData?.transactionstatus === "Pending"
              ? "Your transation is been proccesed ,once confirmed your order will be approved"
              : `Your transation has been confirmed and your order is currently ${userData?.status}`}
          </p>
          <h4>YOUR ORDER</h4>
          <div className="transaction-order-details">
            <p className="item-heading">
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
            </p>
            {userData?.product.map((item) => (
              <div key={item._id} className="product-details">
                <span>{item?.productname}</span>
                <span>₦ {item?.productprice.toLocaleString()}</span>
                <span> {item?.quantity}</span>
                <span>₦ {item?.total.toLocaleString()}</span>
              </div>
            ))}

            <div className="transaction-status first">
              <span>Transaction status:</span>
              <span
                style={{
                  color: (() => {
                    switch (userData?.transactionstatus) {
                      case "abandoned":
                        return "#db504a";
                      case "success":
                        return "#3d91e6";
                      default:
                        return "red";
                    }
                  })(),
                }}
              >
                {" "}
                {userData?.transactionstatus}
              </span>
            </div>
            <div className="transaction-status">
              <span>Order status:</span>
              <span> {userData?.status}</span>
            </div>
            <div className="transaction-status">
              <span>Delivery address:</span>
              <span> {userData?.deliveryaddress}</span>
            </div>
            <div className="total-amount">
              <h1>₦ {userData?.totalAmount.toLocaleString()}</h1>
            </div>
            <div className="qr-code">
              <QRCode
                value={`http://localhost:3000/ClientDynamic/Reciept/${
                  transactID && transactID
                }`}
              />
            </div>
          </div>

          <div>
            <p>Print page</p>
            <p>Make a report</p>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default transactionrecipt;
