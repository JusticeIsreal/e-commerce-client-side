import React, { useState, useEffect } from "react";

import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
// import Loader from "../../Components/Loader";
import { HiRefresh, HiCloudDownload } from "react-icons/hi";
import {
  MdArrowBackIos,
  MdOutlineNearbyError,
  MdPendingActions,
} from "react-icons/md";
// ICONS
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { GoIssueOpened } from "react-icons/go";

import { FaShoppingCart, FaPeopleCarry, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  allTransactions,
  allUsers,
  getSessionUser,
} from "../../Services/functions";
import Link from "next/link";
function Transaction() {
  // Navgat back
  // const history = useNavigate();
  const router = useRouter();
  // TRANSACTION STATUS
  const [allTransaction, setAllTransaction] = useState([]);
  const [deliveredTransaction, setDeliveredTransaction] = useState([]);
  const [processingTransaction, setProccessingTransaction] = useState([]);
  const [openTransaction, setOpenTransaction] = useState([]);

  // FETCH ALL TRANSACTIONS

  // console.log(getTransactions?.transactionStatus);
  const [getTransactions, setGetTransactions] = useState();
  const [getTransaction, setGetTransaction] = useState();

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const transactions = await allTransactions();
      // const users = await allUsers();

      if (transactions) {
        setGetTransactions(transactions);
        setGetTransaction(
          transactions?.transactions.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      }
    };

    fetchAllTransactions();
  }, [router]);
  console.log(getTransactions);
  // GET TOTAL SUM BY STATUS
  // SUCESSFUL TRANSACTIONS
  const [getTotal, setGetTotal] = useState();
  let totalAmountSum = 0;
  useEffect(() => {
    const sumByStatus = () => {
      for (let i = 0; i < getTransactions?.transactions?.length; i++) {
        totalAmountSum += getTransactions?.transactions[i].totalAmount;
      }
    };
    sumByStatus();

    setGetTotal(totalAmountSum);
  }, [getTransactions, router]);
  // SUCESSFUL TRANSACTIONS
  const [getSuccessfulTotal, setGetSuccessfulTotal] = useState();
  let successTotalAmountSum = 0;
  useEffect(() => {
    const sumByStatus = () => {
      for (let i = 0; i < getTransactions?.success?.length; i++) {
        successTotalAmountSum += getTransactions?.success[i].totalAmount;
      }
    };
    sumByStatus();

    setGetSuccessfulTotal(successTotalAmountSum);
  }, [getTransactions, router]);

  // PENDING TRANSACTIONS
  const [getPendingTotal, setGetPendingTotal] = useState();
  let pendingTotalAmountSum = 0;
  useEffect(() => {
    const sumByStatus = () => {
      for (let i = 0; i < getTransactions?.pending?.length; i++) {
        pendingTotalAmountSum += getTransactions?.pending[i].totalAmount;
        // console.log(getTransactions.Processing[i].totalAmount);
      }
    };
    sumByStatus();

    setGetPendingTotal(pendingTotalAmountSum);
  }, [getTransactions, router]);

  //  ABANDONED TRANSACTIONS
  const [getAbandonedTotal, setGetAbandonedTotal] = useState();
  let abandonedTotalAmountSum = 0;
  useEffect(() => {
    const sumByStatus = () => {
      for (let i = 0; i < getTransactions?.abandoned?.length; i++) {
        abandonedTotalAmountSum += getTransactions?.abandoned[i].totalAmount;
      }
    };
    sumByStatus();

    setGetAbandonedTotal(abandonedTotalAmountSum);
  }, [getTransactions, router]);

  //  FAILED TRANSACTIONS
  const [getFailedTotal, setGetFailedTotal] = useState();
  let failedTotalAmountSum = 0;
  useEffect(() => {
    const sumByStatus = () => {
      for (let i = 0; i < getTransactions?.failed?.length; i++) {
        failedTotalAmountSum += getTransactions?.failed[i].totalAmount;
      }
    };
    sumByStatus();

    setGetFailedTotal(failedTotalAmountSum);
  }, [getTransactions, router]);

  // ALLOW ONLY ADMI AND STAFF ACCESS
  const [userPosition, setUserPosituon] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      const userData = await getSessionUser();
      setUserPosituon(userData?.user.position);

      if (userPosition === "client") {
        router.push("/");
      }
    };
    userInfo();
  }, [userPosition, router]);

  // go back
  function goBack() {
    router.back();
  }

  return (
    <div id="content">
      {userPosition === "admin" || userPosition === "staff" ? (
        <>
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
                  <h1>Orders</h1>

                  <ul className="breadcrumb">
                    <li>
                      <a href="">Dashboard</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>
                    </li>
                    <li onClick={() => goBack()}>
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
                      <h3>{getTransactions?.success.length}</h3>
                      <p>Successful</p>
                      <h3>₦ {getSuccessfulTotal?.toLocaleString()}</h3>
                    </span>
                  </li>
                  <li>
                    <MdPendingActions className="bx bxs-calendar-check" />
                    <span className="text">
                      <h3>{getTransactions?.pending.length}</h3>
                      <p>Pending</p>
                      <h3>₦ {getPendingTotal?.toLocaleString()}</h3>
                    </span>
                  </li>
                  <li>
                    <MdOutlineNearbyError className="bx bxs-dollar-circle" />
                    <span className="text">
                      <h3>{getTransactions?.abandoned.length}</h3>
                      <p>Abandoned</p>
                      <h3>₦ {getAbandonedTotal.toLocaleString()}</h3>
                    </span>
                  </li>
                  <li>
                    <GoIssueOpened
                      className="bx bxs-calendar-check"
                      style={{ color: "red" }}
                    />
                    <span className="text">
                      <h3>{getTransactions?.failed.length}</h3>
                      <p>Failed</p>
                      <h3>₦ {getFailedTotal.toLocaleString()}</h3>
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
                  <h3>
                    {getTransactions?.transactions.length} <br /> Total
                  </h3>
                  <h1>₦ {getTotal.toLocaleString()}</h1>
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
                      <th>Date</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>transaction</th>
                      <th>Order</th>
                    </tr>
                  </thead>
                  {getTransaction?.map((order) => (
                    <StoreTransaction
                      key={order._id}
                      {...order}
                      // fetchProducts={fetchProducts}
                    />
                  ))}
                </table>
              </div>
            </div>
          </main>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

Transaction.requireAuth = true;
export default Transaction;

function StoreTransaction({
  _id,
  timestamp,
  user,
  product,
  totalAmount,
  transactionstatus,
  status,
}) {
  return (
    //
    <tbody style={{ color: "black" }}>
      <tr>
        <td style={{ display: "block" }}>
          {new Date(timestamp).toLocaleDateString()} <br />
          {new Date(timestamp).toLocaleTimeString()}
        </td>

        <td>{user[0].username}</td>
        <td>
          {product?.map((item) => (
            <b key={item._id} style={{ display: "flex", fontWeight: "normal" }}>
              <b style={{ fontWeight: "normal" }}>{item.productname} </b>
            </b>
          ))}
        </td>

        <td>₦ {totalAmount.toLocaleString()}</td>
        <td>
          <b
            style={{
              backgroundColor: (() => {
                switch (transactionstatus) {
                  case "abandoned":
                    return "#db504a";
                  case "Pending":
                    return "#ffce26";
                  case "success":
                    return "#3d91e6";
                  default:
                    return "#db504a";
                }
              })(),
              color: "white",
              fontWeight: "normal",
              padding: "3px 5px",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            {transactionstatus}
          </b>
        </td>
        <td>
          <b
            style={{
              backgroundColor: (() => {
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
              color: "white",
              padding: "3px 5px",
              fontWeight: "normal",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            {status}
          </b>
        </td>
        <td
          style={{
            fontSize: "20px",
          }}
        >
          {/* <FaEdit
            style={{ cursor: "pointer", color: "#3c91e6", margin: "0 12px" }}
          /> */}

          <Link href={`/Adminpage/transaction/${_id}`}>
            <p className="edit-product-btn">DETAILS</p>
          </Link>
        </td>
      </tr>
    </tbody>
  );
}
