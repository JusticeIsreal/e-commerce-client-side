import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../Loader";
// firebase
import { db, storage } from "../../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Products() {
  // Products from firebase
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProducts(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div className="product-session-con">
      <div className="product-main-con">
        <h1>PRODUCTS</h1>

        {/* PRODUCTS ARRAY */}
        {products.length < 1 ? (
          <Loader />
        ) : (
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
        )}

        {/* SEE MORE */}
        <Link href="/ProductsPage">
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
  return (
    <div className="products">
      <div className="product-img">
        <Link
          href="/ClientDynamic/[productID]"
          as={`/ClientDynamic/${id}`}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {" "}
          <img src={productimages[0]} alt="" className="home-product-img" />
        </Link>
      </div>
      <p className="product-name">{productname}</p>
      <div className="price">
        <p className="product-price">₦ {productprice}</p>
        <p className="product-oldprice">
          {" "}
          {productoldprice && "₦ " + productoldprice}
        </p>
      </div>

      <Link href="/" className="addto-cart">
        Add to cart
      </Link>
    </div>
  );
}
