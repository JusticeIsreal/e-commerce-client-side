import Loader from "../../Components/Loader";
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
} from "firebase/firestore";
import { db } from "../../Firebase";
import Image from "next/image";
import { Blockquote } from "@mantine/core";

// ICONS
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";

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
            (item) => item.category !== `${product.productcategory}`
          )
        );
      }
    );
  }, [db]);
  console.log(similarProducts);
  // console.log(product.productcategory);
  return (
    <div className="client-single-product">
      <div className="single-product">
        <div className="big-display-con">
          <button onClick={goBack} className="go-back">
            <TiArrowBack />
            Back
          </button>
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
      <div className="single-product-details">
        <h1 className="p-name">{product.productname}</h1>
        <p className="p-number">
          {" "}
          <span>Product spec :</span> {product.productnumber}
        </p>
        <p className="p-desc">
          <span>Product description :</span> <br /> {product.productdescription}
        </p>
        <div className="product-qty-price-con">
          <div className="qty-con">
            <span>
              <FiMinusCircle />
            </span>
            <h3>1</h3>
            <span>
              <FiPlusCircle />
            </span>
          </div>
          <h1>₦ {Number(product.productprice).toLocaleString()}</h1>
        </div>
        <div className="add-to-cart-con">
          <div className="add">Add to cart</div>
          <div className="buy">Buy Now</div>
          <div className="view">View Cart</div>
        </div>

        <div className="product-review">
          <h1>REVIEW</h1>
          <div className="review-con">
            <div className="add-review">
              <span>+</span>
              <a href="">Add Review</a>
            </div>

            <div className="reviews">
              <div className="quote">
                <Blockquote cite="Date/time">
                  <p>user name</p>
                  <p className="quote-text">
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
              <div className="quote">
                <Blockquote cite="Date/time">
                  <p className="user-name">user name</p>
                  <p className="quote-text">
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
              <div className="quote">
                <Blockquote cite="Date/time">
                  <p className="user-name">user name</p>
                  <p className="quote-text">
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
              <div className="quote">
                <Blockquote cite="Date/time">
                  <p className="user-name">user name</p>
                  <p className="quote-text">
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </div>
        {/* similar products */}

        {similarProducts.length < 1 ? (
          <Loader />
        ) : (
          <div className="similar-products">
            {similarProducts.map((product) => (
              <SimilarProducts
                key={product.id}
                id={product.id}
                productimages={product.data().image}
                productname={product.data().productname}
                productprice={product.data().productprice}
                productoldprice={product.data().productoldprice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;

function SimilarProducts({
  id,
  productimages,
  productname,
  productprice,
  productoldprice,
}) {
  return (
    <div className="products">
      <div className="product-img">
        <Link
          href="/ClientDynamic/[productID]"
          as={`/ClientDynamic/${id}`}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <img
              src={productimages[0]}
              alt="img"
              className="home-product-img"
              // style={{
              //   width: "100px",
              // }}
              // fill
              // sizes="100vw"
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
