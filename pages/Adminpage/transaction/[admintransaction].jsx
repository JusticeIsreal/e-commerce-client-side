import React, { useEffect, useState } from "react";
import SingleTransaction from "../../../Components/AdminPageComponents/SingleTransaction";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  singleTransactionFetcher,
  transactionStatus,
} from "../../../Services/functions";
import axios from "axios";
import QRCode from "qrcode.react";

import html2canvas from "html2canvas";

import Cookies from "js-cookie";

import { TiArrowBack } from "react-icons/ti";
import Loader from "../../../Components/Loader";
import { SlCallEnd } from "react-icons/sl";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const API = "http://localhost:1234/api/v1/transaction/getsingletransaction";
function admintransaction() {
  const router = useRouter();
  const { admintransaction: transactID } = router.query;
  const {
    data: userData,
    isLoading,
    error,
  } = useSWR(transactID ? transactID : null, singleTransactionFetcher);

  // FETCH TRANSACTION STATUS

  useEffect(() => {
    async function fetchSessionUser() {
      if (userData && transactID) {
        await transactionStatus(userData, transactID);
      }
    }
    fetchSessionUser();
  }, [userData, router, transactID]);

  function goBack() {
    router.back();
  }
  console.log(userData?.user[0]);
  // save pae as image
  const saveAsImage = (element) => {
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // get usersession
  const [session, setSession] = useState(false);
  return (
    <div className="receipt-main-con">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="receipt-heading">
            <button onClick={goBack} className="go-back">
              <TiArrowBack />
              Back
            </button>
            <h3>Transaction Receipt</h3>
            <p className="paystackRef">
              Order Ref: <span>{userData?.paystackRef}</span>
            </p>
            <h4>TRANSACTION</h4>
          </div>
          <div className="receipt-con main-detail-con">
            <div className="detail-con">
              <div className="transaction-order-detail">
                <div
                  className="transaction-status"
                  style={{
                    width: "95%",
                  }}
                >
                  <span>Customer name:</span>
                  <span>{userData?.user[0].username}</span>
                </div>
                <div
                  className="transaction-status"
                  style={{
                    width: "95%",
                  }}
                >
                  <span>Customer phonenumber:</span>
                  <span>{userData?.user[0].userphonenumber}</span>
                </div>
                <div
                  className="transaction-status"
                  style={{
                    width: "95%",
                  }}
                >
                  <span>Customer email:</span>
                  <span>{userData?.user[0].useremail}</span>
                </div>
                <div
                  className="transaction-status"
                  style={{
                    width: "95%",
                  }}
                >
                  <span>Position :</span>
                  <span>{userData?.user[0].position}</span>
                </div>
                <div
                  className="transaction-status"
                  style={{
                    width: "95%",
                    marginBottom: "20px",
                    borderBottom: "1px dashed gray",
                  }}
                >
                  <span>Verified :</span>
                  <span>{userData?.user[0].verified ? "Yes" : "No"}</span>
                </div>

                <p
                  className="item-heading"
                  style={{
                    width: "95%",
                    marginTop: "50px",
                  }}
                >
                  <span className="p-name">Product</span>
                  <span>Price</span>
                  <span className="qty">Qty</span>
                  <span>Total</span>
                </p>
                {userData?.product.map((item) => (
                  <div key={item._id} className="product-details">
                    <span className="p-name">{item?.productname}</span>
                    <span>₦ {item?.productprice.toLocaleString()}</span>
                    <span className="qty"> {item?.quantity}</span>
                    <span>₦ {item?.total.toLocaleString()}</span>
                  </div>
                ))}
                <div
                  className="transaction-status"
                  style={{
                    width: "95%",
                    marginTop: "10px",
                    borderTop: "1px dashed gray",
                  }}
                >
                  <span>Delivery fee:</span>
                  <span>₦ {userData?.deliveryfee}</span>
                </div>
                <div className="transaction-status" style={{ width: "95%" }}>
                  <span>Home delivery:</span>
                  <span>
                    ₦ {userData?.homedelivery ? userData.homedelivery : "No"}
                  </span>
                </div>
                <div
                  className="transaction-status first"
                  style={{ width: "95%", borderTop: "1px dashed gray" }}
                >
                  <span>Transaction status:</span>
                  <span
                    style={{
                      color: (() => {
                        switch (userData?.transactionstatus) {
                          case "Pending":
                            return "#db504a";
                          case "abandoned":
                            return "#ffce26";
                          case "success":
                            return "#3d91e6";
                          default:
                            return "#3d91e6";
                        }
                      })(),
                    }}
                  >
                    {userData?.transactionstatus}
                  </span>
                </div>
                <div className="transaction-status" style={{ width: "95%" }}>
                  <span>Order status:</span>
                  <span
                    style={{
                      color: (() => {
                        switch (userData?.status) {
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
                    {" "}
                    {userData?.status}
                  </span>
                </div>
                <div className="transaction-status" style={{ width: "95%" }}>
                  <span>Date / Time:</span>
                  <span>
                    {" "}
                    {userData?.timestamp.substring(0, 20).toString()}
                  </span>
                </div>
                <div className="transaction-status" style={{ width: "95%" }}>
                  <span>Delivery address:</span>
                  <span> {userData?.deliveryaddress}</span>
                </div>
                <div className="total-amount">
                  <h1>₦ {userData?.totalAmount.toLocaleString()}</h1>
                </div>
              </div>

              {/* SECOND PART */}
              <div className="transaction-order-detail">
                <div className="contact-customer">
                  <a href="">
                    <span>
                      <SlCallEnd />
                      <p>Call</p>
                    </span>
                  </a>

                  <a href="">
                    <span>
                      <BsWhatsapp />
                      <p>Whatsapp</p>
                    </span>
                  </a>

                  <a href="">
                    <span>
                      <AiOutlineMail />
                      <p>Email</p>
                    </span>
                  </a>
                </div>
                <div className="qr-code">
                  <QRCode
                    value={`https://e-commerce-client-justiceisreal.vercel.app/ClientDynamic/Reciept/${
                      transactID && transactID
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 
          <div className="download-page">
            <p onClick={() => saveAsImage(document.body)}>Print page</p>
            <a
              href="https://wa.me/+2348104015180?text=Hello, I am a customer on your platfor 'AJIS STORS' and i need your support."
              target="_blank"
            >
              {" "}
              <p>Make a report</p>
            </a>
          </div> */}
          </div>
        </>
      )}{" "}
    </div>
  );
}

export default admintransaction;
