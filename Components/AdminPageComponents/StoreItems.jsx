import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "../Pagination";
import { paginate } from "../../paginate";
import { HiRefresh } from "react-icons/hi";
// import Loader from "../Loader";
// ICONS
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useRouter } from "next/router";
import { allUsers } from "../../Services/functions";

function StoreItems({ productDetails }) {
  // ...................................
  // const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const pageOfCountries = paginate(productDetails, currentPage, pageSize);

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
    <div>
      <div className="table-data">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "60px",
            paddingTop: "50px",
            overflow: "hidden",
          }}
        >
          <div className="head">
            <h3>Product List : {productDetails.length}</h3>
          </div>
        </div>

        {productDetails.length < 1 ? (
          <Loader />
        ) : (
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
                  <th>Img</th>
                  <th>Name</th>
                  <th>Spec</th>
                  <th>Price</th>
                  <th>Cat</th>
                  <th>Class</th>
                  <th>Desc</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              {pageOfCountries.map((product) => {
                return (
                  <StoreItemsIndividual
                    key={product.id}
                    id={product.id}
                    productcategory={product.data().productcategory}
                    productclass={product.data().productclass}
                    productdescription={product.data().productdescription}
                    productimages={product.data().image}
                    productname={product.data().productname}
                    productprice={product.data().productprice}
                    productnumber={product.data().productnumber}
                  />
                );
              })}
            </table>
            <Pagination
              itemsCount={productDetails.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreItems;

function StoreItemsIndividual({
  id,
  productcategory,
  productclass,
  productdescription,
  productimages,
  productname,
  productprice,
  productnumber,
}) {
  const deleteProduct = async (id) => {
    const itemRef = doc(db, "products", id);
    await deleteDoc(itemRef);
    // console.log("Item successfully deleted!");
  };

  // console.log(productnumber);
  return (
    //
    <tbody style={{ color: "black" }}>
      <tr>
        <td>
          <img
            src={productimages && productimages[0]}
            alt={productname}
            style={{ width: "40px", borderRadius: "0%", margin: "5px" }}
          />
        </td>
        <td style={{ width: "11%" }}>
          <p>{productname}</p>
        </td>
        <td style={{ width: "10%", margin: "5px" }}>{productnumber}</td>
        <td style={{ width: "10%", margin: "5px" }}>
          {Number(productprice).toLocaleString()}
        </td>
        <td style={{ width: "10%", margin: "5px" }}>{productcategory}</td>
        <td style={{ width: "10%", margin: "5px" }}>{productclass}</td>
        <td style={{ width: "27%", margin: "5px" }}>
          {productdescription.substring(0, 70)} . . .
        </td>
        <td
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            width: "100px",
          }}
        >
          <Link href={`/Adminpage/store/${id}`}>
            <p className="edit-product-btn">EDIT</p>
          </Link>
          <b className="delete-product-btn" onClick={() => deleteProduct(id)}>
            {" "}
            DELETE
          </b>
        </td>
      </tr>
    </tbody>
  );
}
