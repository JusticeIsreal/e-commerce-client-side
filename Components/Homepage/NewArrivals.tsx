import { useEffect, useState } from "react";
import Link from "next/link";

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
import Image from "next/image";

function NewArrivals() {
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
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

        <div className="new-products-con">
          {trendingProducts.map((product) => (
            <TrendingProducts
              key={product.id}
              id={product.id}
              productname={product.data().productname}
              productprice={product.data().productprice}
              productoldprice={product.data().productoldprice}
              productimages={product.data().image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;

function TrendingProducts({
  id,
  productprice,
  productoldprice,
  productimages,
  productname,
}: {
  id: string;
  productprice: number;
  productoldprice: number;
  productimages: string;
  productname: string;
}) {
  // percentage of peomo
  const priceDifference =
    parseFloat(productoldprice.toString()) -
    parseFloat(productprice.toString());

  const percentageDifference = Math.floor(
    (priceDifference / parseFloat(productoldprice.toString())) * 100
  );
  return (
    <div className="new-products-case">
      <Link href={`/ClientDynamic/${id}`}>
        <div className="new-products">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {productoldprice && (
              <p className="percentage-off">
                {percentageDifference}% <br />
                <span>off</span>
              </p>
            )}
            <Image
              src={productimages[0]}
              alt="img"
              className="img"
              fill
              sizes="100vw"
            />
          </div>
          {/* <img src={productimages[0]} alt="" /> */}
        </div>
      </Link>
      <p className="pname">{productname}</p>
    </div>
  );
}
