import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Blockquote } from "@mantine/core";
const defaultAdImg =
  "https://res.cloudinary.com/isreal/image/upload/v1681738017/advert_prqqfr.png";
function Advert() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <div className="ad-con">
      <Carousel
        // withIndicators
        // height={200}
        slideSize="33.333333%"
        slideGap="md"
        dragFree
        loop
        align="start"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        plugins={[autoplay.current]}
      >
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="ad-img">
            <a href="/">
              <img src={defaultAdImg} alt="add" />
            </a>
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export default Advert;
