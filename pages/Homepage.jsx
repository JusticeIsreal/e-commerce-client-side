import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
// firebase
import { db, storage } from "../Firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
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
import { useRouter } from "next/router";
import { addToCart, getSessionUser } from "../Services/functions";

const Homepage = () => {
  // Products from firebase db
  const [products, setProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProducts(snapshot.docs);
      }
    );
  }, []);

  // ADD TO CART
  const [triger, setTriger] = useState(1);
  const [ddd, setddd] = useState(1);
  const addToCar = async (id) => {
    setTriger(!triger);
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);
    const productData = productSnapshot.data();
    setTriger(!triger);
    const userData = await addToCart(productData);
    setddd(userData);
    setTriger(triger + 1);
  };

  return (
    <div className="homepage-main-con">
      {/* TOPBAR */}
      <Topbar triger={triger} ddd={ddd} />
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
          <Products products={products} addToCar={addToCar} />
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
