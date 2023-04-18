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
import Advert from "../Components/Homepage/Advert";
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
  const [triger, setTriger] = useState("");

  const addToCar = async (id) => {
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);
    const productData = productSnapshot.data();
    const triger = await getSessionUser();
    await addToCart(productData);
    setTriger(triger);
  };
  console.log(triger);

  return (
    <div className="homepage-main-con">
      {/* TOPBAR */}
      <Topbar triger={triger} />
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

          <Advert />
          {/* MAIN PRODUCT */}
          <Products products={products} addToCar={addToCar} />
          <Advert />
          {/* SUBSCRIBE */}
          <NewsLetter />
          {/* PROMO */}
          <Promo />
          {/* REVIEWS */}
          <Review />
          <Advert />
          {/* FOOTER */}
          <Footer />
        </>
      )}
    </div>
  );
};
// Homepage.requireAuth = true;

export default Homepage;
