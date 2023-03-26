import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Fade, Slide } from "react-slideshow-image";
function Banner() {
  const promo = [
    {
      id: 3,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679725095/E-Commerce%20Project/aaron-burden-9RpDzXTlNh8-unsplash_syzdew.jpg",
      cat: "Classic Pack",
      desc: "Classic pack for you classic look, wallets, glasses, pure leather belt, tie and great scent. we got you covereed for classic look",
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679725028/E-Commerce%20Project/joseph-greve-dPw0N01onxE-unsplash_qiayzv.jpg",
      cat: "Sun shades",
      desc: "Perfect sun shade for that summer outing, keep you on the VIP list and great personality on the 001 sun shade",
    },
    {
      id: 1,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679725015/E-Commerce%20Project/daniel-storek-JM-qKEd1GMI-unsplash_tghekk.jpg",
      cat: "Shoes",
      desc: "Your number 1 go to shop for all the standard shoe fit, strong durable and original to keep you on top of your game",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679725083/E-Commerce%20Project/maarten-van-den-heuvel-1t-sb-SgAxs-unsplash_k9fblx.jpg",
      cat: "Phones",
      desc: "gardget and  obile accessories for all the standard shoe fit, strong durable and original to keep you on",
    },
  ];

  return (
    <div className="banner-main-con">
      <div className="content">
        <div className="text-content">
          <h2>AJIS STORE</h2>

          {/* SIAPLAYING PRODUCTS DETAILS*/}
          <div className="banner-text-con">
            <Fade arrows={false}>
              {promo.map((item, index) => (
                <div key={item.id} className="cat-desc">
                  <h3>{item.cat}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </Fade>
          </div>
        </div>

        {/* SIAPLAYING PRODUCTS IMAGES*/}
        <div className="banner-product-img-main-con">
          <div className="swiper-wrapper">
            <Fade arrows={false}>
              {promo.map((item, index) => (
                <div className="banner-img-con" key={item.id}>
                  <div className="div-2">
                    <img
                      src={item.img}
                      alt=""
                      style={{
                        right: "0",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Fade>
          </div>

          <img
            src="https://res.cloudinary.com/isreal/image/upload/v1679349295/E-Commerce%20Project/stand_kzmbbh.png"
            className="stand"
            alt=""
          />

          {/* PRODUCT BUTTON */}
          <Link href="/ProductsPage">Shop now</Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;