import React from "react";
import Link from "next/link";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../Loader";

import { BannerObject } from "../../customtypes";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";

function AdvertItems({ advertDetails }) {
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
            <h3>Advert : {advertDetails.length}</h3>
          </div>
        </div>

        {advertDetails.length < 1 ? (
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
                  <th>Img</th>
                  <th>Img</th>
                  <th>Img</th>
                  <th>Ad Link</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {advertDetails.map((product) => {
                return (
                  <AdevertItemsIndividual
                    key={product.id}
                    id={product.id}
                    image={product.data().image}
                    link={product.data().adlink}
                  />
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvertItems;

function AdevertItemsIndividual({ id, image, link }) {
  const deleteProduct = async (id) => {
    const itemRef = doc(db, "advert", id);
    await deleteDoc(itemRef);
    alert("Advert successfully deleted!");
  };

  return (
    //
    <tbody style={{ color: "black" }}>
      <tr>
        <td>
          <img
            src={image[0]}
            alt={link}
            style={{ width: "40px", borderRadius: "0%", margin: "5px" }}
          />
        </td>
        <td>
          <img
            src={image[1]}
            alt={link}
            style={{ width: "40px", borderRadius: "0%", margin: "5px" }}
          />
        </td>
        <td>
          <img
            src={image[2]}
            alt={link}
            style={{ width: "40px", borderRadius: "0%", margin: "5px" }}
          />
        </td>
        <td>
          <img
            src={image[3]}
            alt={link}
            style={{ width: "40px", borderRadius: "0%", margin: "5px" }}
          />
        </td>
        <td>
          <p>{link}</p>
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
          <b className="delete-product-btn" onClick={() => deleteProduct(id)}>
            {" "}
            DELETE
          </b>
        </td>
      </tr>
    </tbody>
  );
}
