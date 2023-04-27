import Image from "next/image";
import Link from "next/link";

// ICONS
import { BsSearch } from "react-icons/bs";
import { FC, useEffect, useState } from "react";

interface ProductsProps {
  displayedProducts: any[];
}
const Products: FC<ProductsProps> = ({ displayedProducts }) => {
  // filter products by category
  const dynamicBtn = [
    "All",
    ...new Set(
      displayedProducts.map((category) => category?.data()?.productcategory)
    ),
  ];
  // console.log(displayedProducts);
  // state for category
  const [category, setCategory] = useState("All");

  // state for products
  const [products, setProducts] = useState(displayedProducts);

  // filter products based on category
  useEffect(() => {
    if (category === "All") {
      setProducts(displayedProducts);
    } else {
      setProducts(
        displayedProducts?.filter(
          (item) => item.data().productcategory === category
        )
      );
    }
  }, [category, displayedProducts]);

  // search by input value
  const [search, setSearch] = useState(" ");

  return (
    <div className="product-page-con">
      {/* CATEGORY FILTER */}

      <form>
        <BsSearch />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ..."
        />
      </form>
      <div className="category-con">
        {dynamicBtn.map((btn, index) => (
          <button
            key={index}
            // className="category"
            className={`${
              btn === category ? "category active-category" : "category"
            }`}
            onClick={() => setCategory(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}

      {/* PRODUCTS ARRAY */}

      <div className="product">
        {products
          .filter((item) => {
            if (item.data().productname === "") {
              return item;
            } else if (
              item
                .data()
                .productname.toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((product) => (
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
};

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
  // percentage of peomo
  const priceDifference =
    parseFloat(productoldprice?.toString()) -
    parseFloat(productprice?.toString());

  const percentageDifference = Math.floor(
    (priceDifference / parseFloat(productoldprice.toString())) * 100
  );

  // console.log(productimages);
  return (
    <div className="single-product">
      <Link href={`/ClientDynamic/${id}`}>
        <div className="product-img">
          {productoldprice && (
            <p className="percentage-off">
              {percentageDifference}% <br />
              <span>off</span>
            </p>
          )}
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
        <h3 className="p-name">{productname}</h3>
      </Link>

      <div className="product-details">
        <div className="price">
          <span className="current-price">
            ₦ {Number(productprice).toLocaleString()}
          </span>
          <span className="old-price">
            {" "}
            {productoldprice && "₦" + Number(productoldprice).toLocaleString()}
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
