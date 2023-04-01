import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Firebase";
import Image from "next/image";

// ICONS
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

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
  return (
    <div className="client-single-product">
      <div className="single-product">
        <div className="big-display-con">
         
          <div className="big-display-img">
            <Image src={product.image[disimg]} alt="img" fill sizes="100vw" />
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
      <div>
        <h1>{product.productname}</h1>
        <p>{product.productnumber}</p>
        <p>{product.productdescription}</p>
        <div>
          <div>
            {" "}
            <span>
              <FiMinusCircle />
            </span>
            <h3>1</h3>
            <span>
              <FiPlusCircle />
            </span>
          </div>

          <h1>₦ {product.productprice}</h1>
        </div>
        <div>
          <div>Add to cart</div>
          <div>Buy Noe</div>
          <div>View in Cart</div>
        </div>

        <div>
          <h3>REVIEW</h3>
          <div>
            <div>
              <button>Add Review in position absolute</button>
            </div>
            <div>
              <p>Date / time</p>
              <p>Review text using mantine</p>
              <p>User name</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
