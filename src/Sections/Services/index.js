import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Service1 from "../../assets/WebDevService.svg";
import SeoImages from "../../assets/seo-service.svg";

const GlobalStyle = createGlobalStyle`
  @keyframes scrollreveal {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;

const services = [
  { title: "Web Development", image: Service1 },
  { title: "App Development", image: Service1 },
  { title: "Cloud Service", image: Service1 },
  { title: "SEO Service", image: SeoImages },
  { title: "By per click", image: Service1 },
  { title: "Wordpress Development", image: Service1 },
  { title: "Bounty Hunting", image: Service1 },
  { title: "Social Media", image: Service1 },
];

const FeatureTitleWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10vh;
  margin-bottom: 16px;
  position: relative;
`;

const FeatureTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const FeatureTitle = styled.h1`
  font-size: 18rem;
  font-weight :100;
  text-align: left;
  margin: 0;
  position: relative;
`;

const ServiceCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20px;
  right: -150px;
`;

const ServiceCount = styled.small`
  font-size: 5rem;
  color: black;
  font-weight: 100;
`;

const Arrow = styled.span`
  display: inline-block;
  font-size: 9rem;
  transform: rotate(96deg);
  color: black;
  font-weight :100;
`;

const CardContainer = styled(motion.div)`
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  width: 45vw;
  height: 70vh;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  ${(props) =>
    props.animate &&
    `
    animation: scrollreveal linear;
    animation-timeline: view();
    animation-range: 0 30%;
  `}

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
`;

const CardTextWrapper = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: sans-serif;
  margin-bottom: 5px;
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  color: gray;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  row-gap: 10vh;
  width: 90vw;
  margin-top: 20px;
  animation: appear 0.8s ease-out forwards;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const ExpandedCard = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
`;

const Card = ({ image, title, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const handleClick = () => {
    setIsExpanded(true);
    setTimeout(() => {
      navigate(`/services/${slug}`);
    }, 1000);
  };

  const shouldAnimate = index > 1;

  return (
    <>
      <motion.div
        layoutId={title}
        onClick={handleClick}
        style={{ cursor: "pointer", position: "relative", zIndex: isExpanded ? 9999 : "auto" }}
      >
        <CardContainer animate={shouldAnimate}>
          <CardImage src={image} alt={title} />
        </CardContainer>
        <CardTextWrapper>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>We provide the best {title} services</CardSubtitle>
        </CardTextWrapper>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedCard
            layoutId={title}
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            exit={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <CardImage src={image} alt={title} />
          </ExpandedCard>
        )}
      </AnimatePresence>
    </>
  );
};

const ServicePage = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <FeatureTitleWrapper>
        <FeatureTitleContainer>
          <FeatureTitle>Services</FeatureTitle>
          <ServiceCountWrapper>
            <ServiceCount>{services.length}</ServiceCount>
            <Arrow>&#8599;</Arrow>
          </ServiceCountWrapper>
        </FeatureTitleContainer>
      </FeatureTitleWrapper>
      <CardsWrapper>
        {services.map((service, index) => (
          <Card key={index} image={service.image} title={service.title} index={index} />
        ))}
      </CardsWrapper>
    </AppContainer>
  );
};

export default ServicePage;