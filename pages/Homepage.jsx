import { useContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useForm } from "react-hook-form";
import { Group, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
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
import Modal from "../Components/Modal";
import Review from "../Components/Homepage/Review";
import Advert from "../Components/Homepage/Advert";
import { AuthGuard } from "./api/auth/AuthGuard.";
import { useRouter } from "next/router";
import { addToCart, allCartItem, getSessionUser } from "../Services/functions";
import { CartQuantityContext } from "./_app";

const Homepage = () => {
  const router = useRouter();
  const [loginTriger, setLoginTriger] = useState(false);

  // Products from firebase db
  const [products, setProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProducts(snapshot.docs);
      }
    );
  }, [router, loginTriger]);

  // ADD TO CART

  const setCartQty = useContext(CartQuantityContext).setCartQty;

  // add to art
  const addToCar = async (e, id) => {
    e.target.innerHTML = "Loading ...";
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);
    const productData = productSnapshot.data();
    const triger = await getSessionUser();

    if (!triger) {
      return setLoginTriger(true);
    }
    const productExist = triger?.userCart.find((item) => item.productID === id);

    if (
      (productExist && !productExist.productID) ||
      productExist === undefined
    ) {
      const cartResponse = await addToCart(productData, id);
      if (cartResponse === "SUCCESS") {
        const userData = await getSessionUser();
        setCartQty(userData?.user.cart.length);
        e.target.innerHTML = "Now In Cart";
        notifications.show({
          title: "Notification",
          message: "Successful , Item added to cart",
        });
      }
    } else {
      notifications.show({
        title: "Notification",
        message: "Failed, Item already in cart",
        color: "red",
      });
      e.target.innerHTML = "Already In Cart";
    }
    if (!triger) {
      return setLoginTriger(true);
    }
  };
  // console.log(cartBtnLoading);
  return (
    <div className="homepage-main-con" style={{ position: "relative" }}>
      {/* TOPBAR */}
      <Topbar />
      {/* BANNER */}

      {products.length < 1 ? (
        <Loader />
      ) : (
        <>
          {/* <AuthGuard> */}

          <Group position="center"></Group>
          <Banner />
          {/* NEW ARRIVALS */}
          <NewArrivals />
          {/* <Advert /> */}
          {/* MAIN PRODUCT */}
          <Products products={products} addToCar={addToCar} />
          <Advert />
          {/* SUBSCRIBE */}
          {/* <NewsLetter /> */}
          {/* PROMO */}
          <Promo />
          {/* REVIEWS */}
          <Review />
          {/* <Advert /> */}
          {/* FOOTER */}
          <Footer />
          {loginTriger && <Modal setLoginTriger={setLoginTriger} />}
        </>
      )}
    </div>
  );
};
// Homepage.requireAuth = true;

export default Homepage;
