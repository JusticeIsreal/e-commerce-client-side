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

function Products({ products }: { products: any[] }) {
  return (
    <div className="product-session-con">
      <div className="product-main-con">
        <h1>PRODUCTS</h1>

        {/* PRODUCTS ARRAY */}

        <div className="products-con">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              productimages={product.data().image}
              productname={product.data().productname}
              productprice={product.data().productprice}
              productoldprice={product.data().productoldprice}
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
  id,
  productimages,
  productname,
  productprice,
  productoldprice,
}: {
  id: string;
  productimages: string;
  productname: string;
  productprice: number;
  productoldprice: number;
}) {
  // percentage of peomo
  const priceDifference =
    parseFloat(productoldprice.toString()) -
    parseFloat(productprice.toString());

  const percentageDifference = Math.floor(
    (priceDifference / parseFloat(productoldprice.toString())) * 100
  );

  // add to cart
  const [cartItem, setCartItem] = useState<any[]>([]);

  const addToCar = async (id: string) => {
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);
    const productData = productSnapshot.data();

    // Retrieve the cart data from local storage
    let product: any[] = [];
    let cart: any[] = [];

    product.push(productData);
    cart.push(productData);

    console.log(product);

    const userData = await addToCart(productData);
    // Save the updated cart data to local storage
    // localStorage.setItem("localCart", JSON.stringify(cart));
    jgi();
    await getSessionUser();
  };

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
          // href="/ClientDynamic/[productID]"
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
      <p className="product-name">{productname}</p>
      <div className="price">
        <p className="product-price">
          ₦ {Number(productprice).toLocaleString()}
        </p>
        <p className="product-oldprice">
          {" "}
          {productoldprice && "₦ " + Number(productoldprice).toLocaleString()}
        </p>
      </div>

      <button className="addto-cart" onClick={() => addToCar(id)}>
        Add to cart
      </button>
    </div>
  );
}
