import StoreItems from "../../Components/AdminPageComponents/StoreItems";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";

import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
function EditTransaction() {
  // FETCH SINGLE Transaction
  // const { _id } = useParams();
  const [singleTransactionUser, setSingleTransactionUser] = useState([]);
  const [singleTransaction, setSingleTransaction] = useState([]);
  const [singleTransactionDetails, setSingleTransactionDetails] = useState([]);

  // FECT SINGLE TRANSACTION DETAILS
  const singleProduct = () => {
    // axios
    //   .get(
    //     `http://localhost:1234/api/v1/transaction/getsingletransaction/${_id}`
    //   )
    //   .then((resp) => {
    //     setSingleTransactionDetails(resp.data.data);
    //     setSingleTransaction(resp.data.data.product);
    //     setSingleTransactionUser(resp.data.data.user[0]);
    //   })
    //   .catch((error) => console.log(error));
  };
  useEffect(() => {
    singleProduct();
  }, []);

  // UPDATE TRANSACTION STATUS

  // SUBMIT UPDATE
  const onSubmit = (data) => {
    const productDetails = { ...singleTransactionDetails, status: data.status };

    // axios
    //   .patch(
    //     `http://localhost:1234/api/v1/transaction/updatetransaction/${_id}`,
    //     productDetails
    //   )
    //   .then((resp) => {
    //     singleProduct();
    //     fetchProducts();

    //     alert("Status has been updataed");
    //     window.location.href = "/transaction";
    //   })
    //   .catch((error) => console.log(error));
  };

  // NAVIGATE PAGE BACK
  // const history = useNavigate();
  return (
    <div>
      {" "}
      <Topbar />
      <Sidebar />
      <div className="store-main-con">
        <div id="content">
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Update Product</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                  </li>
                  <li>
                    <a href="">Transction</a>
                  </li>
                  <li onClick={() => history(-1)}>
                    <a
                      className="active"
                      href="#"
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
                <a href="#updateform" style={{ color: "white" }}>
                  <b className="bx bxs-cloud-download"> </b>
                  <span className="text">Order Details</span>
                </a>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  margin: "10px",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Product Name :
                  </span>
                  {/* {singleTransactionUser.name} */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Email :
                  </span>
                  {/* <a
                    href={`https://${singleTransactionUser.email}`}
                    target="_blank"
                  >
                    {singleTransactionUser.email}
                  </a> */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Phone number :
                  </span>
                  {/* <a
                    href={`https://${singleTransactionDetails.usernumber}`}
                    target="_blank"
                  >
                    {singleTransactionDetails.usernumber}
                  </a> */}
                </p>
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Phone number :
                  </span>
                  {/* <a
                    href={`https://${singleTransactionDetails.deliveryaddress}`}
                    target="_blank"
                  >
                    {singleTransactionDetails.deliveryaddress}
                  </a> */}
                </p>
                {/* <p>
                  {singleTransaction.map((product) => (
                    <span
                      key={product._id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                        Product :{" "}
                        <span style={{ color: "black", fontWeight: "normal" }}>
                          {product.productname} {product.productprice} -
                          {product.quantity}
                        </span>
                      </span>
                    </span>
                  ))}
                </p> */}
                <p>
                  <span style={{ fontWeight: "bolder", color: "#3d91e6" }}>
                    Total Amount :
                  </span>

                  {/* {singleTransactionDetails.totalAmount} */}
                </p>
              </div>
            </div>

            <div className="store-form-container" id="updateform"></div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EditTransaction;
