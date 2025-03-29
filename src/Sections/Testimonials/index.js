import React, { lazy, useEffect, useRef } from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Card = lazy(() => import("../../components/Card/index"));

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color :white;
  width: 100%;
  padding: 5rem 0;
`;

const Title = styled.h1`
  color: #0a0b10;
  display: inline-block;
  font-size: calc(1rem + 1.5vw);
  margin-top: 1.5rem;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    border-bottom: 2px solid var(--purple);
  }
`;

const Carousal = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only Screen and (max-width: 40em) {
    width: 90vw;
    .slick-slider .slick-arrow {
      display: none;
    }
  }
  .slick-slider .slick-arrow:before {
    color: #0a0b10;
    font-size: 1.5rem;
    @media only Screen and (max-width: 40em) {
      display: none;
    }
  }
  .slick-slider .slick-dots button:before {
    color: #0a0b10;
    font-size: 1rem;
  }
  .slick-slide.slick-active {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-bottom: 3rem;
  }
`;

const Testimonials = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <Section>
      <Title>Few good words about us!</Title>
      <Carousal>
        <Slider {...settings} ref={sliderRef}>
          <Card
            text="MT has been essential part of our business. I would definetly
        recommend MT. It has been amazing to have them."
            name="SAHIL (SS)"
            image="avatar-1"
          />

          <Card
            text="MT has been essential part of our business. I would definetly recommend MT. It has been amazing to have them."
            name="SAHIL (SS)"
            image="avatar-2"
          />

          <Card
            text="MT has been essential part of our business. I would definetly recommend MT. It has been amazing to have them."
            name="VINNET (SSS)"
            image="avatar-3"
          />

          <Card
            text="MT has been essential part of our business. I would definetly recommend MT. It has been amazing to have them."
            name="DHRUV (SSSSS)"
            image="avatar-4"
          />
        </Slider>
      </Carousal>
    </Section>
  );
};

export default Testimonials;