//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
import HeroSection from "../Sections/Hero/index";
import ScrollEffect from "../components/ScrollEffect";
 import ScrollDraw from "../components/ScrollEffect";
import Testimonials from "../Sections/Testimonials/index";
import Contact from "../Sections/Contact/index";
import styled from "styled-components";
import CameraSection from "../Sections/CameraSection/cameraSection";
 import HeroSectionSecond from "../components/HeroSectionSecond";
import FeaturedServices from "../components/FeaturedServices";
import ConnectComponent from "../components/ConnectComponent";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const Home = () => {
  return (
    
    <Container>

 <HeroSection/>
 
 <HeroSectionSecond/>
 <FeaturedServices/>
   <ConnectComponent/>
    
      <CameraSection/>
      <Testimonials />
      <Contact />
    </Container>
  );
};

export default Home;
