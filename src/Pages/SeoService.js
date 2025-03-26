//This is home page, It will contains all the sections require in this page.

//Import all the require sections here

import styled from "styled-components";
import Seo from "../AllServices/Seo"
 import ServicePage from "../Sections/Services";
 import ServiceAnimationComponent from "../AllServices/webDevelopment";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const SeoService = () => {
  return (
    <Container>
   <Seo/>
     
        </Container>
  );
};

export default SeoService;
