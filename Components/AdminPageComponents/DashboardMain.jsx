import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaStoreAlt } from "react-icons/fa";
import {
  allTransactions,
  allUsers,
  transactionStatus,
} from "../../Services/functions";

// ICONS
import { FaShoppingCart, FaPeopleCarry, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/router";
import Pagination from "../Pagination";
import { paginate } from "../../paginate";
function DashboardMain({ productDetails }) {
  const router = useRouter();
  // FETCH ALL TRANSACTIONS

  const [getTransactions, setGetTransactions] = useState();
  const [getUsers, setGetUsers] = useState();
  useEffect(() => {
    const ftchAllTransactions = async () => {
      const transactions = await allTransactions();
      const users = await allUsers();
      // await transactionStatus();
      if (transactions && users) {
        setGetTransactions(transactions);
        setGetUsers(users);
      }
    };
    ftchAllTransactions();
  }, [router]);

  const [getRecentTransactions, setGetRecentTransactions] = useState([]);
  useEffect(() => {
    const fetchProccessingTransactions = async () => {
      const transaction = await allTransactions();
      setGetRecentTransactions(
        transaction?.transactions
          .filter((item) => item.status === "Processing")
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      );
    };
    fetchProccessingTransactions();
    // setGetRecentTransactions(recetTransactions);
  }, [router]);

  // ...................................
  // const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const pageOfCountries = paginate(
    getRecentTransactions,
    currentPage,
    pageSize
  );

  const handlePageChange = (pageNumber, totalPages) => {
    if (pageNumber !== "prev" && pageNumber !== "next")
      setCurrentPage(pageNumber);
    else if (pageNumber === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    else if (pageNumber === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  // ..................................
  return (
    <div id="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn-download">
            <span className="text" style={{ color: "white" }}>
              Client Page
            </span>
          </Link>
        </div>

        <ul className="box-info">
          <Link href="/Adminpage/Store">
            <li>
              <FaStoreAlt className="bx bxs-calendar-check" />
              <span className="text">
                <h3>{productDetails.length}</h3>
                <p>Products</p>
              </span>
            </li>
          </Link>
          <Link href="/Adminpage/Transaction">
            <li>
              <FaShoppingCart className="bx bxs-calendar-check" />
              <span className="text">
                <h3>{getTransactions?.transactions.length}</h3>
                <p>Transactions</p>
              </span>
            </li>
          </Link>

          <li>
            <FaPeopleCarry className="bx bxs-group" />
            <span className="text">
              <h3>{getUsers?.users.length}</h3>
              <p>Registered Users</p>
            </span>
          </li>
        </ul>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Opened Transactions</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>

            <table
              className="table"
              style={{
                width: "100%",
                minWidth: "500px",
              }}
            >
              <thead>
                <tr>
                  <th>Date/Time </th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Product</th>
                  <th>Status</th>
                </tr>
              </thead>
              {pageOfCountries?.map((order) => (
                <RecentTransactions key={order._id} {...order} />
              ))}
            </table>
          </div>
        </div>
      </main>
      <Pagination
        itemsCount={getRecentTransactions?.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default DashboardMain;

function RecentTransactions({
  _id,
  product,
  totalAmount,
  transactionstatus,
  status,
  timestamp,
}) {
  // console.log(product.map((item) => item.productname));
  return (
    <tbody style={{ color: "black" }}>
      <tr>
        <td>
          <Link
            href={`/Adminpage/transaction/${_id}`}
            className="table-detais-link"
          >
            {new Date(timestamp).toLocaleDateString()} <br />
            {new Date(timestamp).toLocaleTimeString()}
          </Link>
        </td>
        <td>
          <Link
            href={`/Adminpage/transaction/${_id}`}
            className="table-detais-link"
          >
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
          </Link>
        </td>
        <td
          style={{
            fontSize: "13px",
            paddingRight: "10px",
          }}
        >
          <Link
            href={`/Adminpage/transaction/${_id}`}
            style={{}}
            className="table-detais-link"
          >
            ₦ {totalAmount.toLocaleString()}
          </Link>
        </td>
        <td
          style={{
            display: "block",
            fontSize: "13px",
            paddingRight: "10px",
          }}
        >
          <Link
            href={`/Adminpage/transaction/${_id}`}
            className="table-detais-link"
          >
            {product?.map((item) => (
              <i key={item._id} style={{ display: "flex" }}>
                <i>{item.productname} </i>
              </i>
            ))}
          </Link>
        </td>

        <td>
          <Link
            href={`/Adminpage/transaction/${_id}`}
            style={{}}
            className="table-detais-link"
          >
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
          </Link>
        </td>
      </tr>
    </tbody>
  );
}
