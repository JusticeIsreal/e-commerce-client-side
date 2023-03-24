import React from "react";
import { Fade, Slide } from "react-slideshow-image";
function Banner() {
  const promo = [
    {
      id: 233,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693121/E-Commerce%20Project/anastasia-malysh-G_wA7CKDXFs-unsplash-removebg-preview_1_ixwho1.png",
      price: 200,
      oldprice: 500,
      desc: "Tription about this produt and the offer you are giving on this particular brand and possible discounts if any at all",
    },
    {
      id: 143,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679692898/E-Commerce%20Project/jonathan-borba-BI9NjChWn6s-unsplash-removebg-preview_zmdi5e.png",
      price: 200,
      oldprice: 500,
      desc: "This is a short sdescription about this produt and the offer you are giving on this particular brand and poany at all",
    },
    {
      id: 17650762,
      img: "https://res.cloudinary.com/isreal/image/upload/v1679693180/E-Commerce%20Project/ryan-plomp-jvoZ-Aux9aw-unsplash-removebg-preview_kexemj.png",
      price: 200,
      desc: "This is a short description about this produtthis particular brand and possible discounts if any at all",
    },
  ];
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
  ];
  return (
    <div className="banner-main-con">
      <div className="content">
        <div className="text-content">
          <h2>AJIS STORE</h2>
          <div className="banner-text-con">
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
