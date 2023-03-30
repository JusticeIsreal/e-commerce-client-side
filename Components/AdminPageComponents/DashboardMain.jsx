import React from "react";
// import Loader from "../Loader";
import Link from "next/link";
import { FaStoreAlt } from "react-icons/fa";
const img =
  "https://res.cloudinary.com/isreal/image/upload/v1675285922/My%20portfolio%20Project/1671744344371-removebg-preview_dxwbbb.png";

// ICONS
import { FaShoppingCart, FaPeopleCarry, FaChartLine } from "react-icons/fa";
function DashboardMain() {
  // console.log(transaction);
  // console.log(users);
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
          <li>
            <FaStoreAlt className="bx bxs-calendar-check" />
            <span className="text">
              {/* <h3>{products.length}</h3> */}
              <p>Products</p>
            </span>
          </li>
          <li>
            <FaShoppingCart className="bx bxs-calendar-check" />
            <span className="text">
              {/* <h3>{transaction.length}</h3> */}
              <p>Transactions</p>
            </span>
          </li>
          <li>
            <FaPeopleCarry className="bx bxs-group" />
            <span className="text">
              {/* <h3>{users.length}</h3> */}
              <p>Registered Users</p>
            </span>
          </li>
        </ul>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Recent Transactions</h3>
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
                  <th>User</th>
                  <th>Address</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody style={{ color: "black" }}>
                <tr>
                  <td
                    style={{
                      display: "block",
                      fontSize: "13px",
                      paddingRight: "10px",
                    }}
                  >
                    {/* {transaction.user[0].name} <br /> */}
                    {/* {transaction.user[0].email} */}
                    <br />
                    {/* {transaction.usernumber} */}
                  </td>

                  <td
                    style={{
                      fontSize: "13px",
                      paddingRight: "10px",
                    }}
                  >
                    {/* {transaction.deliveryaddress} */}
                  </td>
                  <td style={{ fontSize: "12px" }}>
                    {/* {transaction.timestamp.substring(0, 19)} */}
                  </td>
                  <td>
                    <b
                    // style={{
                    //   backgroundColor: (() => {
                    //     switch (transaction.status) {
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
                      {/* {transaction.status} */}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardMain;
