import Loader from "../../Components/Loader";
import Topbar from "../../Components/Topbar";
import Footer from "../../Components/Footer";
import Moment from "react-moment";
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
import { Blockquote } from "@mantine/core";

// ICONS
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { useForm } from "react-hook-form";

export async function getStaticPaths() {
  const colRef = collection(db, "products");
  const snapshot = await getDocs(colRef);
  const paths = snapshot.docs.map((doc) => ({
    params: { productID: doc.id },
  }));

  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const { productID } = params;
  const productDoc = doc(db, "products", productID);
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

function Details({ product }) {
  const router = useRouter();
  const { productID } = router.query;
  const pic = useRef();
  // console.log(product);

  const [disimg, setDisimg] = useState(0);
  const changeIMG = (index) => {
    setDisimg(index);
    // console.log(disimg);
    // console.log(pic.current.classList);
  };

  // GO BACK

  function goBack() {
    router.back();
  }

  // simillar product

  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "products"),
        where("productcategory", "==", `${product.productcategory}`)
      ),
      (snapshot) => {
        setSimilarProducts(
          snapshot.docs.filter(
            (item) =>
              item.data().productdescription !== `${product.productdescription}`
          )
        );
      }
    );
  }, [db, product.productcategory, product.productname]);

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
    // console.log(product);

    // post coment func
    await addDoc(collection(db, "products", productID, "review"), {
      ...data,
      timestamp: serverTimestamp(),
    });

    reset();
  };
  // fetch comment rom firebase
  const [review, setReview] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "products", productID, "review"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setReview(snapshot.docs)
      ),
    [db, productID]
  );

  // toggle review form
  const [showForm, setShowForm] = useState(false);
  // toggle review view
  const [showAll, setShowAll] = useState(false);
  const maxComments = 1;

  const displayedReviews = showAll ? review : review.slice(0, maxComments);

  // maths
  const [priceNumber, setPriceNumber] = useState(
    parseFloat(product.productprice)
  );

  // qty
  const [count, setCount] = useState(1);

  const addProductQTY = () => {
    const total = parseFloat(product.productprice) * count;
    setPriceNumber(total);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    addProductQTY();
    // setPriceNumber(parseFloat(product.productprice));
  }, [count]);

  // REST PRICE AND QTY WHEN ROUTED TO NEW PRODUCT
  const originalPrice = parseFloat(product.productprice);
  const resetPrice = async () => {
    setCount(1);
    setPriceNumber(originalPrice);
  };

  useEffect(() => {
    resetPrice();
  }, [originalPrice]);

  // percentage of peomo
  const priceDifference =
    parseFloat(product.productoldprice.toString()) -
    parseFloat(product.productprice.toString());

  const percentageDifference = Math.floor(
    (priceDifference / parseFloat(product.productoldprice.toString())) * 100
  );
  return (
    <>
      <Topbar />
      <div className="client-single-product">
        <div className="single-product">
          <div className="top-container">
            {" "}
            <div className="big-display-con">
              <button onClick={goBack} className="go-back">
                <TiArrowBack />
                Back
              </button>
              {product.productoldprice && (
                <p className="percentage-off">
                  {percentageDifference}% <br />
                  <span>off</span>
                </p>
              )}
              <div className="big-display-img">
                <Image
                  src={product.image[disimg]}
                  alt="img"
                  fill
                  sizes="100vw"
                  className="img"
                />
              </div>
            </div>
            <div className="small-display-img-con">
              {product.image.map(
                (img, index) =>
                  img && (
                    <div className="small-display-img" key={index}>
                      <Image
                        src={img}
                        alt="img"
                        fill
                        sizes="100vw"
                        ref={pic}
                        onClick={() => changeIMG(index)}
                      />
                    </div>
                  )
              )}
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

            <div className="product-qty-price-con">
              <div className="qty-con">
                {count < 1 ? (
                  ""
                ) : (
                  <span onClick={() => setCount(count - 1)}>
                    <FiMinusCircle />
                  </span>
                )}
                <h3>{count}</h3>
                <span onClick={() => handleIncrement()}>
                  <FiPlusCircle />
                </span>
              </div>
              <h1>₦ {priceNumber.toLocaleString()}</h1>
            </div>
            <div className="add-to-cart-con">
              <div className="add">Add to cart</div>
              <div className="buy">Buy Now</div>
              <div className="view">View Cart</div>
            </div>
          </div>
        </div>
        <div className="single-product-details">
          {" "}
          <div className="product-review">
            <h1>REVIEW</h1>
            <div className="review-con">
              <div
                className="add-review"
                onClick={() => setShowForm(!showForm)}
              >
                <span>{!showForm ? "+" : "-"}</span>
                <span>{!showForm ? "Add Review" : "Close form"}</span>
              </div>

              {/* REVIEW FORM */}
              {showForm && (
                <div className="review-form-con">
                  {" "}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* PRODUCT PRICE */}
                    <label>User Name</label>
                    <input
                      type="text"
                      placeholder="eg. John Doe"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <span
                        className="errror-msg"
                        style={{
                          fontSize: "12px",
                          fontStyle: "italic",
                          color: "red",
                        }}
                      >
                        Kindly Enter Your Name
                      </span>
                    )}
                    {/* USER EMAAIL*/}
                    <label>User Email</label>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      {...register("useremail", { required: true })}
                    />
                    {errors.useremail && (
                      <span
                        className="errror-msg"
                        style={{
                          fontSize: "12px",
                          fontStyle: "italic",
                          color: "red",
                        }}
                      >
                        Kindly Enter Your Email
                      </span>
                    )}
                    {/* PRODUCT NUMBER */}
                    <label>Your Review</label>
                    <textarea
                      type="text"
                      placeholder="Make Your Review"
                      {...register("yourreview", { required: true })}
                    />
                    {errors.yourreview && (
                      <span
                        className="errror-msg"
                        style={{
                          fontSize: "12px",
                          fontStyle: "italic",
                          color: "red",
                        }}
                      >
                        Kindly Enter Your Review
                      </span>
                    )}
                    <input type="submit" className="submit-btn" value="SEND" />
                  </form>
                </div>
              )}

              <div className="reviews">
                {displayedReviews.map((comment) => (
                  <div className="quote" key={comment.id}>
                    <Blockquote cite="" className="chatit">
                      <p>{comment.data().username} </p>
                      <sup>{comment.data().useremail}</sup>
                      <p className="quote-text">{comment.data().yourreview}</p>
                      <Moment fromNow className="time-posted">
                        {comment.data().timestamp?.toDate()}
                      </Moment>
                    </Blockquote>
                  </div>
                ))}
                <div className="see-more">
                  {review.length ? (
                    <p onClick={() => setShowAll(!showAll)}>
                      {!showAll || review.length === 1
                        ? "See more..."
                        : "Close..."}
                    </p>
                  ) : (
                    <p>No Reviews</p>
                  )}
                </div>
                <p className="review-count">
                  Total of {review.length}{" "}
                  {review.length > 1 ? "reviews" : "review"}
                </p>
              </div>
            </div>
          </div>
          {/* similar products */}
          <>
            <h3 style={{ marginTop: "100px", color: "#3c91e6" }}>
              {similarProducts.length > 0 && "SIMILAR PRODUCTS"}
            </h3>{" "}
            <div className="similar-products">
              <div className="single-product-con">
                {similarProducts.map((product) => (
                  <SimilarProducts
                    key={product.id}
                    id={product.id}
                    productimages={product.data().image}
                    productname={product.data().productname}
                    productprice={product.data().productprice}
                    productoldprice={product.data().productoldprice}
                    resetPrice={resetPrice}
                  />
                ))}
              </div>
            </div>
          </>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Details;

function SimilarProducts({
  resetPrice,
  id,
  productimages,
  productname,
  productprice,
  productoldprice,
}) {
  // percentage of peomo
  const priceDifference =
    parseFloat(productoldprice.toString()) -
    parseFloat(productprice.toString());

  const percentageDifference = Math.floor(
    (priceDifference / parseFloat(productoldprice.toString())) * 100
  );
  return (
    <div className="products">
      <div className="product-img">
        {productoldprice && (
          <p className="percentage-off">
            {percentageDifference}% <br />
            <span>off</span>
          </p>
        )}
        <Link
          href="/ClientDynamic/[productID]"
          as={`/ClientDynamic/${id}`}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={productimages[0]}
              alt="img"
              className="home-product-img"
              fill
              sizes="100vw"
              onClick={() => resetPrice()}
            />
          </div>
        </Link>
      </div>
      <p className="product-name">{productname}</p>
      <div className="price">
        <p className="product-price">
          ₦ {Number(productprice).toLocaleString()}
        </p>
        <p className="product-oldprice">
          {" "}
          {productoldprice && "₦ " + Number(productoldprice).toLocaleString()}
        </p>
      </div>

      <Link href="/" className="addto-cart">
        Add to cart
      </Link>
    </div>
  );
}
