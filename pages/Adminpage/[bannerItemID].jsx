import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import Image from "next/image";

// ICONS
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { useForm } from "react-hook-form";

export async function getStaticPaths() {
  const colRef = collection(db, "banneritems");
  const snapshot = await getDocs(colRef);
  const paths = snapshot.docs.map((doc) => ({
    params: { bannerItemID: doc.id },
  }));

  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const { bannerItemID } = params;
  const productDoc = doc(db, "banneritems", bannerItemID);
  const productSnapshot = await getDoc(productDoc);
  const productData = productSnapshot.data();

  // Convert timestamp to string
  productData.timestamp = productData.timestamp.toString();

  return {
    props: {
      product: productData,
    },
  };
};

function AdminProduct({ product }) {
  const router = useRouter();
  const { productID } = router.query;
  console.log(product);
  // GO BACK

  function goBack() {
    router.back();
  }

  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // submit review
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);

    reset();
  };
  // fetch comment rom firebase
  const [review, setReview] = useState([]);

  // toggle review form
  const [showForm, setShowForm] = useState(false);
  // toggle review view
  const [showAll, setShowAll] = useState(false);
  const maxComments = 1;

  const displayedReviews = showAll ? review : review.slice(0, maxComments);

  return (
    <div className="client-single-product">
      <div className="single-product">
        <div className="top-container">
          {" "}
          <div className="big-display-con">
            <button onClick={goBack} className="go-back">
              <TiArrowBack />
              Back
            </button>
            <div className="big-display-img">
              <Image
                src={product.image}
                alt="img"
                fill
                sizes="100vw"
                className="img"
              />
            </div>
          </div>
        </div>

        {/* lower part */}
        <div className="lower-details">
          <h1 className="p-name">{product.productname}</h1>
          <p className="p-number">
            <span>Product spec :</span> {product.productnumber}
          </p>
          <div>
            <p className="p-desc">
              <span>Product category :</span> {product.productcategory}
            </p>
            <p className="p-desc">
              <span>Product promo :</span>
              {product.productoldprice
                ? " YES :" +
                  " " +
                  "(old price" +
                  " " +
                  "~" +
                  " " +
                  `${Number(product.productoldprice).toLocaleString()})`
                : " NO"}
            </p>
          </div>
          <p className="p-desc">
            <span>Product description : </span>
            {product.productdescription}
          </p>
          <p className="p-desc">
            <span>Product delivery : </span>
            maximum delivery period of 7 days within nigeria.
          </p>
          <p className="p-desc">
            <span>Return Policy : </span>
            Product warrante lasts 48hrs after delievery notice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
