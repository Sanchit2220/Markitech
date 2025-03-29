import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import service1 from '../../assets/WebHome.svg'
import service2 from '../../assets/Marketing.svg'

 
gsap.registerPlugin(ScrollTrigger);

const FeatureTitle = styled.h1`
  font-size: 6rem;
   text-align: center;
  margin-bottom: 16px;
 
`;

const CardContainer = styled.div`
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   width: 45vw;
  height: 60vh;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 50vw;
    height: 80vh;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
   transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
 
  }
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  font-family: sans-serif;
  margin-top: 10px;
  text-align: left;
  width: 45vw;
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  min-height: 100vh;
   padding: 16px;
  overflow: hidden;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 90vw;
  justify-content: space-between;
 
  gap: 25px;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Card = ({ image, title }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
     
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CardContainer ref={cardRef}>
        <CardImage src={image} alt="Card" />
      </CardContainer>
      <CardTitle>{title}</CardTitle>
    </div>
  );
};

const FeaturedServices = () => {
  return (
    <AppContainer>
      
      <CardsWrapper>
        <Card image={service1} title="Accelerate your brand’s growth with targeted digital marketing solutions.
From strategy to execution, we drive measurable results.
Your trusted digital marketing agency for success." />
        <Card image={service2} title="Delivering cutting-edge web development solutions for modern businesses.
Seamless, scalable, and high-performance digital experiences.
Your trusted partner." />
      </CardsWrapper>
    </AppContainer>
  );
};

export default FeaturedServices;
