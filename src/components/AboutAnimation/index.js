import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const animStar = keyframes`
  from { transform: translateY(0px); }
  to { transform: translateY(-2000px); }
`;

const multipleBoxShadow = (n) => {
  let value = `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
  for (let i = 1; i < n; i++) {
    value += `, ${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
  }
  return value;
};

const Stars = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(700)};
  animation: ${animStar} 50s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(700)};
  }
`;

const Stars2 = styled(Stars)`
  width: 2px;
  height: 2px;
  box-shadow: ${multipleBoxShadow(200)};
  animation-duration: 100s;
  &:after {
    width: 2px;
    height: 2px;
    box-shadow: ${multipleBoxShadow(200)};
  }
`;

const Stars3 = styled(Stars)`
  width: 3px;
  height: 3px;
  box-shadow: ${multipleBoxShadow(100)};
  animation-duration: 150s;
  &:after {
    width: 3px;
    height: 3px;
    box-shadow: ${multipleBoxShadow(100)};
  }
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #fff;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
  span {
    background: -webkit-linear-gradient(white, #38495a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Background = styled.div`
  height: 100vh;
  background: black;;
  overflow: hidden;
`;

const ParallaxStars = () => {
  useEffect(() => {
    document.title = "Pure CSS Parallax Pixel Stars";
  }, []);

  return (
    <Background>
      <Stars />
      <Stars2 />
      <Stars3 />
      <Title>
       
      </Title>
    </Background>
  );
};

export default ParallaxStars;
