import { Carousel } from "@mantine/carousel";
import { Blockquote } from "@mantine/core";

function Review() {
  return (
    <div className="review-main-con">
      <h1>REVIEWS</h1>
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        dragFree
        loop
        align="start"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
      >
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– Kola Ibrahim">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– James Osadolor">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– Nosa Ogbons">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– Godwin Okpo">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– Sandra Jones">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– Taofiq Salem">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="review">
            <div className="review-con">
              <div className="review-text">
                <Blockquote cite="– Emaka Chuks">
                  <p>
                    this is the best place to get all you fashion out fit, they
                    delivered in 2 days , no story
                  </p>
                </Blockquote>
              </div>
            </div>
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export default Review;
