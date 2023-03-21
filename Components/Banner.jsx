import React from "react";
import { Fade, Slide } from "react-slideshow-image";
function Banner() {
  const promo = [
    {
      id: 1,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211865/jayflix%20vid%20posters/photo_2022-09-02_18-45-55_numjln.jpg",
      desc: "This is a short description about this produtthis particular brand and possible discounts if any at all",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211856/jayflix%20vid%20posters/photo_2022-09-02_18-43-21_hx0vs6.jpg",
      desc: "This is a short description about this produt and the offer you are giving on this particular brand and poany at all",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211845/jayflix%20vid%20posters/photo_2022-09-02_18-40-11_u8gi0i.jpg",
      desc: "Tription about this produt and the offer you are giving on this particular brand and possible discounts if any at all",
    },
  ];
  const prom = [
    {
      id: 2,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211856/jayflix%20vid%20posters/photo_2022-09-02_18-43-21_hx0vs6.jpg",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211845/jayflix%20vid%20posters/photo_2022-09-02_18-40-11_u8gi0i.jpg",
    },
    {
      id: 1,
      img: "https://res.cloudinary.com/isreal/image/upload/v1662211865/jayflix%20vid%20posters/photo_2022-09-02_18-45-55_numjln.jpg",
    },
  ];
  return (
    <div className="banner-main-con">
      <div className="content">
        <div className="text-content">
          <h3>Up to 75% off</h3>
          {/* <p>
            Get to read over many books of different types offline. Rentals also
            provides you with most of the best books with affordable rates{" "}
          </p> */}
          <div className="p">
            {" "}
            <Fade arrows={false}>
              {promo.map((item, index) => (
                <p key={item.id}>{item.desc}</p>
              ))}
            </Fade>
          </div>

          <a href="#">Shop now</a>
        </div>
        <div className="banner-product-img-main-con">
          <div className="swiper-wrapper">
            <Fade arrows={false}>
              {promo.map((item, index) => (
                <img
                  src={item.img}
                  alt=""
                  key={item.id}
                  style={{
                    right: "0",
                  }}
                />
              ))}
            </Fade>
            <Fade arrows={false}>
              {prom.map((item, index) => (
                <img
                  src={item.img}
                  alt=""
                  key={item.id}
                  style={{
                    left: "0",
                  }}
                />
              ))}
            </Fade>
          </div>

          <img
            src="https://res.cloudinary.com/isreal/image/upload/v1679349295/E-Commerce%20Project/stand_kzmbbh.png"
            className="stand"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
