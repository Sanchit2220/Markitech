import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  font-family: "Arial", sans-serif;
  padding: 30px;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Title = styled.h2`
  text-align: left;
  font-size: 130px;
  font-weight: 500;
  font-family: sans-serif;
  color: rgb(6, 1, 1);
  margin-bottom: 10px;
  padding-left: 0;

  /* Animation - Starts from center, then moves left */
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible
      ? "scaleY(1) translateX(5%) translateY(0)" /* Moves to left */
      : "scaleY(0) translateX(50%) translateY(50px)"}; /* Starts in center */
  transform-origin: bottom; /* Grows from bottom */
  transition: transform 0.3s ease-out, opacity 1s ease-out;
`;

const ConnectComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Toggle visibility on scroll-in and scroll-out
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
        <Title ref={ref} isVisible={isVisible}>
          Connecting ideas <br /> to uniquely <br /> crafted Experience
        </Title>
      </ContentWrapper>
    </Section>
  );
};

export default ConnectComponent;
