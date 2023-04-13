import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../Components/Loader";
// firebase
import { db, storage } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
// COMPONENTS
import Topbar from "../Components/Topbar";
import Products from "../Components/ProductPage/Products";
import Footer from "../Components/Footer";

function products() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setDisplayedProducts(snapshot?.docs);
      }
    );
  }, [db]);

  return (
    <div className="product-page-main-con">
      {/* TOPBAR */}
      <Topbar />
      {!displayedProducts.length ? (
        <Loader />
      ) : (
        <>
          {/* PRODUCT DETAILS */}
          <Products displayedProducts={displayedProducts} />
          {/* FOOTER */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default products;
