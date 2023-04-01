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

// ICONS
import { Fade, Slide } from "react-slideshow-image";
function Promo() {
  const [promoProducts, setPromoProducts] = useState<any[]>([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), where("productclass", "==", "promo")),
      (snapshot) => {
        setPromoProducts(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div>
      <section className="deal">
        <div className="content">
          <h3>Deal of the day</h3>
          <h1>Up to 40% discount</h1>
          <a href="" className="btn">
            Shop now
          </a>
        </div>
        <div className="fade-con">
          <Fade arrows={false}>
            {promoProducts.map((product, index) => (
              <div className="image" key={product.id}>
                <img src={product.data().image[0]} alt="img" />
              </div>
            ))}
          </Fade>
        </div>
      </section>
    </div>
  );
}

export default Promo;
