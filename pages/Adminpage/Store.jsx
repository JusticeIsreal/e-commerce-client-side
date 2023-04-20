import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// firebase imports
import { db, storage } from "../../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// COMPONENTS
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
import StoreItems from "../../Components/AdminPageComponents/StoreItems";

// ICONS
import { MdArrowBackIos } from "react-icons/md";
import BannerForm from "../../Components/AdminPageComponents/BannerForm";
import ProductForm from "../../Components/AdminPageComponents/ProductForm";
import BannerItems from "../../Components/AdminPageComponents/BannerItems";
import Loader from "../../Components/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSessionUser } from "../../Services/functions";
import AdvertItems from "../../Components/AdminPageComponents/AdvertItems";
import AdvertForm from "../../Components/AdminPageComponents/AdvertForm";

function Store() {
  // display form on and of
  const [formShow, setFormShow] = useState(false);

  // SFETCHIN PRODUCCTS SORTED FROM FIREBABSE
  const [advertDetails, setAdvertDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "advert"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setAdvertDetails(snapshot.docs);
      }
    );
  }, [db]);
  // SFETCHIN PRODUCCTS SORTED FROM FIREBABSE
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProductDetails(snapshot.docs);
      }
    );
  }, [db]);
  // SFETCHIN BANNER SORTED FROM FIREBABSE
  const [bannerDetails, setBannerDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "banneritems"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setBannerDetails(snapshot.docs);
      }
    );
  }, [db]);

  // ALLOW ONLY ADMI AND STAFF ACCESS
  const [userPosition, setUserPosituon] = useState("");
  const router = useRouter();
  useEffect(() => {
    const userInfo = async () => {
      const userData = await getSessionUser();
      setUserPosituon(userData?.user?.position);

      if (userPosition === "client") {
        router.push("/");
      }
    };
    userInfo();
  }, [userPosition, router]);
  return (
    <div className="store-main-con">
      {userPosition === "admin" || userPosition === "staff" ? (
        <>
          {" "}
          <Topbar />
          <Sidebar />
          <div id="content">
            <main>
              <div className="head-title">
                <div className="left">
                  <h1>Store</h1>

                  <ul className="breadcrumb">
                    <li>
                      <a href="#">Dashboard</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>
                    </li>
                    <li>
                      <Link
                        className="active"
                        href="#"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        | Store
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="btn-download"
                  onClick={() => setFormShow(!formShow)}
                >
                  <b className="bx bxs-cloud-download"> + </b>
                  <span className="text">
                    {formShow ? "Close Table" : "Add Product"}
                  </span>
                </div>
              </div>
              {formShow && (
                <div className="store-form-container">
                  <AdvertForm advertDetails={advertDetails} />
                  <BannerForm />
                  {/* PRODUCTS TABLE */}
                  <ProductForm />
                </div>
              )}
              <AdvertItems advertDetails={advertDetails} />
              <BannerItems bannerDetails={bannerDetails} />
              <StoreItems productDetails={productDetails} />
            </main>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
Store.requireAuth = true;
export default Store;
