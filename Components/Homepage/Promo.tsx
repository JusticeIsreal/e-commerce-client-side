import { useEffect, useState } from "react";
import Link from "next/link";

// firebase
import { db, storage } from "../../Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

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
          <Link href="/products" className="btn">
            Shop now
          </Link>
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
