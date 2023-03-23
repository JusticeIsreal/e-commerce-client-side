import React from "react";
import { Fade, Slide } from "react-slideshow-image";
function Promo() {
  const promo = [
    {
      id: 17650762,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679563074/jayflix%20vid%20posters/images_jk6d9o.jpg",
      price: 200,
      // oldprice: 500,
      productname: "Prodct name",
    },
    {
      id: 1,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211865/jayflix%20vid%20posters/photo_2022-09-02_18-45-55_numjln.jpg",
      desc: "This is a short description about this produtthis particular brand and possible discounts if any at all",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211856/jayflix%20vid%20posters/photo_2022-09-02_18-43-21_hx0vs6.jpg",
      desc: "This is a short sdescription about this produt and the offer you are giving on this particular brand and poany at all",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211845/jayflix%20vid%20posters/photo_2022-09-02_18-40-11_u8gi0i.jpg",
      desc: "Tription about this produt and the offer you are giving on this particular brand and possible discounts if any at all",
    },
  ];
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
          <Fade arrows={false} className="fade-con">
            {promo.map((item, index) => (
              <div className="image" key={index}>
                <img src={item.img} alt="" key={index._id} />
              </div>
            ))}
          </Fade>
        </div>
      </section>
      <div className="slide-container">{/* fade import */}</div>
    </div>
  );
}

export default Promo;

// import { Fade, Slide } from "react-slideshow-image";
function PromoFile({ promo }) {
  return (
    <div
      style={{
        width: "50px",
        height: "100px",
        border: "2px solid red",
        display: "flex",
      }}
    >
      {" "}
      <Fade arrows={false} className="fade-con">
        {promo.map((item, index) => (
          <div
            className="image"
            key={index}
            style={{
              width: "50px",
              border: "2px solid red",
              display: "flex",
              position: "absolute",
            }}
          >
            <img
              src={item.productimage}
              alt=""
              key={index._id}
              style={{ width: "50px" }}
            />
          </div>
        ))}
      </Fade>
      PromoFile
    </div>
  );
}
