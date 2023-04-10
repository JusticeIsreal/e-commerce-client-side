import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
// firebase
import { db, storage } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
// components
import Topbar from "../Components/Topbar";
import Banner from "../Components/Homepage/Banner";
import NewArrivals from "../Components/Homepage/NewArrivals";
import Products from "../Components/Homepage/Products";
import NewsLetter from "../Components/Homepage/NewsLetter";
import Promo from "../Components/Homepage/Promo";
import Footer from "../Components/Footer";
import Review from "../Components/Homepage/Review";
import { AuthGuard } from "./api/auth/AuthGuard.";

const Homepage = () => {
  // Products from firebase db
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProducts(snapshot.docs);
      }
    );
  }, []);
  return (
    <div className="homepage-main-con">
      {/* TOPBAR */}
      <Topbar />
      {/* BANNER */}

      {products.length < 1 ? (
        <Loader />
      ) : (
        <>
          {/* <AuthGuard> */}
          <Banner />
          {/* </AuthGuard> */}
          {/* <MyPage /> */}
          {/* NEW ARRIVALS */}
          <NewArrivals />
          {/* MAIN PRODUCT */}
          <Products products={products} />
          {/* SUBSCRIBE */}
          <NewsLetter />
          {/* PROMO */}
          <Promo />
          {/* REVIEWS */}
          <Review />
          {/* FOOTER */}
          <Footer />
        </>
      )}
    </div>
  );
};
// Homepage.requireAuth = true;

export default Homepage;
