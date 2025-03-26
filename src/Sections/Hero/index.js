// This is HeroSection component, Main top section of website

import styled, { keyframes } from "styled-components";
 import pinkBlob from "../../assets/blobPink.png";
import purpleBlob from "../../assets/blob purple.png";
import whiteBlob from "../../assets/blob white.png";
import arrow from "../../assets/Arrow Right.svg";
import Mobile from "../../assets/mobile.svg";
import NeuralNoise from "../../components/AnimatedHome";
const move = keyframes`
0% { transform: translateY(-5px)  }
    50% { transform: translateY(10px) }
    100% { transform: translateY(-5px) }
`;

const HomeSection = styled.section`
  width: 90vw;
  height: 30vw;
  background-color:rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  margin-top:50vw;
  margin-bottom :5vw;
  position: relative;
  @media only Screen and (max-width: 48em) {
    height: 70vw;
    display: block;
  }
  @media only Screen and (max-width: 420px) {
    height: auto;
    padding-bottom: 2rem;
  }
`;

  
 

 
const HeroSection = () => {
  return (
    
     <NeuralNoise />
 
  );
};

export default HeroSection;
