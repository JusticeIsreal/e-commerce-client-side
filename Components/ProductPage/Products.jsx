import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../Loader";
// firebase
import { db, storage } from "../../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// ICONS
import { BsSearch } from "react-icons/bs";
function Products() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setDisplayedProducts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(displayedProducts);
  return (
    <div className="product-page-con">
      {/* CATEGORY FILTER */}

      <form>
        <BsSearch />
        <input type="text" placeholder="Search by name" />
      </form>
      <div className="category-con">
        <a href="" className="category">
          All
        </a>
        <a href="" className="category">
          Category
        </a>
        <a href="" className="category">
          Category
        </a>
        <a href="" className="category">
          Category
        </a>
      </div>

      {/* PRODUCTS */}

      {/* PRODUCTS ARRAY */}
      {displayedProducts.length < 1 ? (
        <Loader />
      ) : (
        <div className="product">
          {displayedProducts.map((product) => (
            <SingleProduct
              key={product.id}
              id={product.id}
              productcategory={product.data().productcategory}
              productclass={product.data().productclass}
              productdescription={product.data().productdescription}
              productimages={product.data().image}
              productname={product.data().productname}
              productprice={product.data().productprice}
              productoldprice={product.data().productoldprice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

function SingleProduct({
  id,
  productimages,
  productname,
  productprice,
  productoldprice,
  productcategory,
  productdescription,
}) {
  return (
    <div className="single-product">
      <Link href="/ClientDynamic/[productID]" as={`/ClientDynamic/${id}`}>
        <div className="product-img">
          <img src={productimages[0]} alt="img" className="product-page-product-img"/>
        </div>
      </Link>
      <h3>{productname}</h3>
      <div className="product-details">
        <div className="price">
          <span className="current-price"> {"₦" + productprice}</span>
          <span className="old-price">
            {" "}
            {productoldprice && "₦" + productoldprice}
          </span>
        </div>
        <div className="detail">
          <span className="category">{productcategory}</span>
          <span className="desc">{productdescription}</span>
        </div>
      </div>
    </div>
  );
}
