import React from "react";

function Products() {
  const prom = [
    {
      id: 1761250762,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693180/E-Commerce%20Project/ryan-plomp-jvoZ-Aux9aw-unsplash-removebg-preview_kexemj.png",
      price: 200,
      // oldprice: 500,
      productname: "Prodct name",
    },
    {
      id: 17650762,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693155/E-Commerce%20Project/irene-kredenets-8j4DiAOBAMo-unsplash-removebg-preview_u84vsi.png",
      price: 200,
      // oldprice: 500,
      productname: "Prodct name",
    },

    {
      id: 176225762,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693137/E-Commerce%20Project/antonio-manaligod-wo_1RjWOh9I-unsplash-removebg-preview_osna3s.png",
      price: 200,
      // oldprice: 500,
      productname: "Prodct name",
    },
    {
      id: 122,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693129/E-Commerce%20Project/giorgio-trovato-LV_4qM5Gf9c-unsplash__1_-removebg-preview_pdgoyi.png",
      price: 200,
      // oldprice: 500,
      productname: "Product name",
    },
    {
      id: 233,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693121/E-Commerce%20Project/anastasia-malysh-G_wA7CKDXFs-unsplash-removebg-preview_1_ixwho1.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 42311,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692918/E-Commerce%20Project/xavier-teo-SxAXphIPWeg-unsplash-removebg-preview_suhw8o.png",
      price: 200,
      // oldprice: 500,
      productname: "Product name",
    },
    {
      id: 41342,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692915/E-Commerce%20Project/usama-akram-s-gYAbQToXk-unsplash-removebg-preview_wwad2x.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 413,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692912/E-Commerce%20Project/usama-akram-kP6knT7tjn4-unsplash-removebg-preview_ikcp8d.png",
      price: 200,
      // oldprice: 500,
      productname: "Product name",
    },
    {
      id: 1411,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692910/E-Commerce%20Project/usama-akram-g3CMh2nqj_w-unsplash-removebg-preview_hrf3oe.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 412,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692909/E-Commerce%20Project/nikita-kachanovsky-ad_0wMHtvlU-unsplash__1_-removebg-preview_whwikx.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 2543,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692906/E-Commerce%20Project/mojtaba-fahiminia-t4g1gctAaKk-unsplash-removebg-preview_ukvkwc.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 32151,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692902/E-Commerce%20Project/mohammad-metri-E-0ON3VGrBc-unsplash-removebg-preview_oxzqgz.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 252,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692900/E-Commerce%20Project/maxim-hopman-8cT5ja0P_N4-unsplash-removebg-preview_uewufd.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
    {
      id: 143,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692898/E-Commerce%20Project/jonathan-borba-BI9NjChWn6s-unsplash-removebg-preview_zmdi5e.png",
      price: 200,
      oldprice: 500,
      productname: "Product name",
    },
  ];
  return (
    <div className="product-session-con">
      <div className="product-main-con">
        <h1>PRODUCTS</h1>
        {/* CATEGORY FILTER */}
        {/* <div className="category-con"> */}
        {/* <p>category</p> */}
        {/* <a href="" className="category">
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
          </a> */}
        {/* </div> */}
        {/* PRODUCTS ARRAY */}
        <div className="products-con">
          {prom.map((item) => (
            <Product key={item.id} {...item} />
          ))}
        </div>
        {/* SEE MORE */}
        <p>See more . . .</p>
      </div>
    </div>
  );
}

export default Products;

function Product({ img, price, oldprice, productname }) {
  return (
    <div className="products">
      <p className="product-name">{productname}</p>
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="price">
        <p className="product-price">₦ {price}</p>
        <p className="product-oldprice"> {oldprice && "₦ " + oldprice}</p>
      </div>

      <a href="" className="addto-cart">
        Add to cart
      </a>
    </div>
  );
}
