import Image from "next/image";
import Link from "next/link";

// ICONS
import { BsSearch } from "react-icons/bs";
function Products({ displayedProducts }: { displayedProducts: any[] }) {
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

      <div className="product">
        {displayedProducts.map((product) => (
          <SingleProduct
            key={product.id}
            id={product.id}
            productcategory={product.data().productcategory}
            // productclass={product.data().productclass}
            productdescription={product.data().productdescription}
            productimages={product.data().image}
            productname={product.data().productname}
            productprice={product.data().productprice}
            productoldprice={product.data().productoldprice}
          />
        ))}
      </div>
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
}: {
  id: string;
  productimages: string;
  productname: string;
  productprice: number;
  productoldprice: number;
  productcategory: string;
  productdescription: string;
}) {
  return (
    <div className="single-product">
      <Link href={`/ClientDynamic/${id}`}>
        <div className="product-img">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={productimages[0]}
              alt="img"
              className="product-page-product-img"
              fill
              sizes="100vw"
            />
          </div>
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
