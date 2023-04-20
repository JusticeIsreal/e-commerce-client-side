import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fade, Slide } from "react-slideshow-image";

// firebase
import { db, storage } from "../../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Loader from "../Loader";

function Banner() {
  // FETCHING BANNER SORTED FROM FIREBABSE
  const [bannerDetails, setBannerDetails] = useState<any[]>([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "banneritems"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setBannerDetails(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div className="banner-main-con">
      <div className="content">
        <div className="text-content">
          <h2>AJIS STORE</h2>

          {/* SIAPLAYING PRODUCTS DETAILS*/}
          <div className="banner-text-con">
            <Fade arrows={false}>
              {bannerDetails.map((item, index) => (
                <div key={item.id} className="cat-desc">
                  <h3 style={{ textTransform: "uppercase", marginTop: "20px" }}>
                    {item.data().bannercategory}
                  </h3>
                  <p>
                    <span style={{ fontWeight: "bolder", color: "#3c91e6" }}>
                      {item.data().bannername} :{" "}
                    </span>
                    {item.data().bannerscription.substring(0, 100).toString()}. . .
                  </p>
                </div>
              ))}
            </Fade>
          </div>
        </div>

        {/* SIAPLAYING PRODUCTS IMAGES*/}
        <div className="banner-product-img-main-con">
          <div className="swiper-wrapper">
            <Fade arrows={false}>
              {bannerDetails.map((item, index) => (
                <div className="banner-img-con" key={item.id}>
                  <div className="div-2">
                    <Image
                      src={item.data().bannerimage}
                      alt="img"
                      className="img"
                      fill
                      sizes="100vw"
                      style={{
                        right: "0",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Fade>
          </div>

          <img
            src="https://res.cloudinary.com/isreal/image/upload/v1679349295/E-Commerce%20Project/stand_kzmbbh.png"
            className="stand"
            alt=""
          />

          {/* PRODUCT BUTTON */}
          <Link href="/products">Shop now</Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
