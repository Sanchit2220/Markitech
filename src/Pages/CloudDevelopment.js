//This is home page, It will contains all the sections require in this page.

//Import all the require sections here

import styled from "styled-components";
 import ServicePage from "../Sections/Services";
 import ServiceAnimationComponent from "../AllServices/webDevelopment";
import CloudPage from "../AllServices/Cloud";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const CloudDevelopment = () => {
  return (
    <Container>
   
     <CloudPage/>
        </Container>
  );
};

export default CloudDevelopment;
