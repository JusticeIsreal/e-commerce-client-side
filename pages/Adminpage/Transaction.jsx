import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
// import Loader from "../../Components/Loader";
import { HiRefresh, HiCloudDownload } from "react-icons/hi";
import { MdArrowBackIos, MdPendingActions } from "react-icons/md";
// ICONS
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { GoIssueOpened } from "react-icons/go";

import { FaShoppingCart, FaPeopleCarry, FaChartLine } from "react-icons/fa";
function Transaction() {
  // Navgat back
  // const history = useNavigate();

  // TRANSACTION STATUS
  const [allTransaction, setAllTransaction] = useState([]);
  const [deliveredTransaction, setDeliveredTransaction] = useState([]);
  const [processingTransaction, setProccessingTransaction] = useState([]);
  const [openTransaction, setOpenTransaction] = useState([]);

  const fetchTransactionStatus = () => {
    // FETCH TRANSACTION
    // fetch("http://localhost:1234/api/v1/transaction/transactionstatus")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setDeliveredTransaction(data.Delivered);
    //     setProccessingTransaction(data.Processing);
    //     setOpenTransaction(data.Open);
    //   })
    //   .catch((error) => {
    //     throw Error(error);
    //   });
    // fetch("http://localhost:1234/api/v1/transaction/alltransaction")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setAllTransaction(data.data);
    //   })
    //   .catch((error) => {
    //     throw Error(error);
    //   });
  };

  useEffect(() => {
    fetchTransactionStatus();
  }, []);
  return (
    <div id="content">
      {" "}
      <Topbar />
      <Sidebar />
      <main>
        <div
          className="head-title"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <div
              className="left"
              style={{
                marginBottom: "10px",
              }}
            >
              <h1>Transactions</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li onClick={() => history(-1)}>
                  <a
                    className="active"
                    href=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MdArrowBackIos /> Back
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-download">
              <b className="bx bxs-cloud-download">
                <HiCloudDownload />{" "}
              </b>
              <span className="text">Download PDF</span>
            </div>
          </div>

          <div className="transaction-ul">
            <ul
              className="box-info"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <li>
                <FaPeopleCarry className="bx bxs-group" />
                <span className="text">
                  {/* <h3>{deliveredTransaction.length}</h3> */}
                  <p>Delivered</p>
                </span>
              </li>
              <li>
                <MdPendingActions className="bx bxs-calendar-check" />
                <span className="text">
                  {/* <h3>{processingTransaction.length}</h3> */}
                  <p>Pending</p>
                </span>
              </li>
              <li>
                <GoIssueOpened className="bx bxs-calendar-check" />
                <span className="text">
                  {/* <h3>{openTransaction.length}</h3> */}
                  <p>Open</p>
                </span>
              </li>
              <li>
                <GiConfirmed className="bx bxs-dollar-circle" />
                <span className="text">
                  {/* <h3>{allTransaction.length}</h3> */}
                  <p>Total</p>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="table-data">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "60px",
              paddingTop: "50px",
              overflow: "hidden",
            }}
          >
            <div className="head">
              <h3>Order List</h3>
            </div>
            <div
              className="head"
              onClick={() => fetchTransactionStatus()}
              style={{
                border: "2px solid #3c91e6",
                padding: "0 5px",
                cursor: "pointer",
              }}
            >
              <HiRefresh />
              Re-Fresh
            </div>
          </div>
          <div className="order" style={{ position: "relative" }}>
            
              <table
                className="table"
                style={{
                  width: "100%",
                  minWidth: "500px",
                }}
              >
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Address</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>payment</th>
                  </tr>
                </thead>

               
                  <StoreTransaction
                    // key={transaction._id}
                    // {...transaction}
                    // fetchProducts={fetchProducts}
                  />
               
              </table>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default Transaction;

function StoreTransaction() {
  const deleteProduct = async () => {
    //     const tokenSaved = localStorage.getItem("token");
    // const jsonData = JSON.parse(tokenSaved);
    // const token = jsonData.token;
    // await axios
    //   .delete(
    //     `http://localhost:1234/api/v1/products/deleteproduct/${_id}`
    //     // {
    //     //   // headers: {
    //     //   //   authorization: `Bearer ${token}`,
    //     //   // },
    //     // }
    //   )

    //   .then((resp) => {
    //     // window.location.reload();
    //     fetchProducts();
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };

  return (
    //
    <tbody style={{ color: "black" }}>
      <tr>
        <td style={{ display: "block", fontSize: "13px" }}>
          {/* {user[0].name} <br /> */}
          <a
            // href={`https://${user[0].email}`}
            target="_blank"
            style={{ display: "block" }}
          >
            {/* {user[0].email} */}
          </a>
          <br />
          <a
            // href={`tel:${usernumber}`}
            target="_blank"
            style={{ display: "block", fontSize: "12px" }}
          >
            {/* {usernumber} */}
          </a>
        </td>

        <td>
          <a
            // href={`https://www.google.com/maps?q=${deliveryaddress}`}
            target="_blank"
            style={{ fontSize: "12px" }}
          >
            {/* {deliveryaddress} */}
          </a>
        </td>
        <td>
          {/* {product.map((product) => (
            <div key={product._id} style={{ fontSize: "12px" }}>
              {product.productname}-N{product.productprice} -{product.quantity}
            </div>
          ))} */}
        </td>
        {/* <td> N{totalAmount}</td> */}
        {/* <td style={{ fontSize: "12px" }}>{timestamp}</td> */}
        <td>
          <b
            // style={{
            //   backgroundColor: (() => {
            //     switch (status) {
            //       case "Open":
            //         return "#db504a";
            //       case "Processing":
            //         return "#ffce26";
            //       case "Delivered":
            //         return "#3d91e6";
            //       default:
            //         return "#3d91e6";
            //     }
            //   })(),
            //   color: "white",
            //   padding: "0 5px",
            //   borderRadius: "5px",
            //   fontSize: "12px",
            // }}
          >
            {/* {status} */}
          </b>
        </td>
        <td>
          <b
            // style={{
            //   backgroundColor: (() => {
            //     switch (status) {
            //       case "Failed":
            //         return "#db504a";
            //       case "Pending":
            //         return "#ffce26";
            //       case "Success":
            //         return "#3d91e6";
            //       default:
            //         return "#3d91e6";
            //     }
            //   })(),
            //   color: "white",
            //   padding: "0 5px",
            //   borderRadius: "5px",
            //   fontSize: "12px",
            // }}
          >
            Success
          </b>
        </td>
        <td
          style={{
            fontSize: "20px",
          }}
        >
        
            <FaEdit
              style={{ cursor: "pointer", color: "#3c91e6", margin: "0 12px" }}
            />
          
        </td>
      </tr>
    </tbody>
  );
}
