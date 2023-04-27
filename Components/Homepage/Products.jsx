import Link from "next/link";
import Image from "next/image";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useEffect, useState } from "react";
import { addToCart, getSessionUser } from "../../Services/functions";
import { jgi } from "../Topbar";

function Products({ products, addToCar }) {
  const halfLength = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, halfLength);

  return (
    <div className="product-session-con">
      <div className="product-main-con">
        <h1>PRODUCTS</h1>

        {/* PRODUCTS ARRAY */}

        <div className="products-con">
          {firstHalf.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              productimages={product.data().image}
              productname={product.data().productname}
              productprice={product.data().productprice}
              productoldprice={product.data().productoldprice}
              addToCar={addToCar}
            />
          ))}
        </div>

        {/* SEE MORE */}
        <Link href="/products">
          <p>See more . . .</p>
        </Link>
      </div>
    </div>
  );
}

export default Products;

function Product({
  addToCar,
  id,
  productimages,
  productname,
  productprice,
  productoldprice,
}) {
  // percentage of peomo
  const priceDifference =
    parseFloat(productoldprice.toString()) -
    parseFloat(productprice.toString());

  const percentageDifference = Math.floor(
    (priceDifference / parseFloat(productoldprice.toString())) * 100
  );

  return (
    <div className="products">
      <div className="product-img">
        {productoldprice && (
          <p className="percentage-off">
            {percentageDifference}% <br />
            <span>off</span>
          </p>
        )}
        <Link
          href={`/ClientDynamic/${id}`}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={productimages[0]}
              alt="img"
              className="home-product-img"
              fill
              sizes="100vw"
            />
          </div>
        </Link>
      </div>
      <Link
        href={`/ClientDynamic/${id}`}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <p className="product-name">{productname}</p>
      </Link>

      <div className="price">
        <p className="product-price">
          ₦ {Number(productprice).toLocaleString()}
        </p>
        <p className="product-oldprice">
          {productoldprice && "₦ " + Number(productoldprice).toLocaleString()}
        </p>
      </div>
      <button className="addto-cart" onClick={(e) => addToCar(e, id)}>
        Add to cart
      </button>
    </div>
  );
}
