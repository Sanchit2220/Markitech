import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MyButton from "../Buttons";
import SparkleButton from "../SparkleButton";

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  height: 90vh;
  font-family: "Arial", sans-serif;
  overflow: hidden; /* Prevents horizontal scrolling */
 
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovingTitle = styled.h2`
  text-align: left;
  font-size: 100px;
  font-weight: 500;
  font-family: sans-serif;
  color: rgb(6, 1, 1);
  margin-bottom: 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateX(50%)" : "translateX(10%)"};
  transition: transform 1s ease-out, opacity 1s ease-out;
`;

const StaticTitle = styled.h2`
  text-align: left;
  font-size: 100px;
  font-weight: 500;
  font-family: sans-serif;
  color: rgb(6, 1, 1);
  margin-top: 0;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 40vw;
  margin-left: auto;
  margin-top: 40vh;
  position: relative;
`;

const Paragraph = styled.p`
  font-size: 1em;
  color: rgb(6, 1, 1);
  line-height: 1.6;
  text-align: left;
`;

const Button = styled.button`
  position: absolute;
  bottom: -50px;
  left: 0;
  margin-top: 10px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const HeroSectionSecond = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Section id="hero-section">
      <ContentWrapper>
        <TitleContainer>
          <MovingTitle ref={ref} isVisible={isVisible}>
            Beyond Visions
          </MovingTitle>
          <StaticTitle>Within Reach</StaticTitle>
        </TitleContainer>
      </ContentWrapper>
      <TextWrapper>
        <Paragraph>
          Markitech is a leading digital solutions provider, offering expert
          services both online and offline. As a digital marketing agency in
          Delhi NCR and a trusted web development agency in Delhi, we create
          tailored strategies that enhance brand visibility, drive engagement,
          and accelerate business growth. Our experienced team blends creativity
          and technology to deliver impactful solutions that set businesses
          apart in the digital and physical world.
          <MyButton
            onClick={() => {
              /* your function */
            }}
          >
            About Us
          </MyButton>
         
        </Paragraph>
      </TextWrapper>
    </Section>
  );
};

export default HeroSectionSecond;
