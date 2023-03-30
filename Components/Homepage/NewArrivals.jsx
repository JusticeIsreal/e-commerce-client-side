import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../Loader";
// firebase
import { db, storage } from "../../Firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function NewArrivals() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "products"),
        where("productclass", "==", "trending")
      ),
      (snapshot) => {
        setTrendingProducts(snapshot.docs);
      }
    );
  }, [db]);
  return (
    <div className="new-arrivals-main-con">
      <div className="new-arrivals-con">
        {/* heading */}
        <h1>TRENDING</h1>
        {/* product container */}
        {trendingProducts.length < 1 ? (
          <Loader />
        ) : (
          <div className="new-products-con">
            {trendingProducts.map((product) => (
              <TrendingProducts
                key={product.id}
                id={product.id}
                productname={product.data().productname}
                productimages={product.data().image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewArrivals;

function TrendingProducts({ id, productimages, productname }) {
  return (
    <div className="new-products-case">
      <Link href="/ClientDynamic/[productID]" as={`/ClientDynamic/${id}`}>
        <div className="new-products">
          <img src={productimages[0]} alt="" />
        </div>
      </Link>

      <p>{productname}</p>
    </div>
  );
}
