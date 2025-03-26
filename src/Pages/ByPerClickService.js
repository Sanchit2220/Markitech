//This is home page, It will contains all the sections require in this page.

//Import all the require sections here

import styled from "styled-components";
 import ServicePage from "../Sections/Services";
 import ServiceAnimationComponent from "../AllServices/webDevelopment";
import BountyHuntingPage from "../AllServices/BountyHunting";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const ByPerClickService = () => {
  return (
    <Container>
   
     <BountyHuntingPage/>
        </Container>
  );
};

export default ByPerClickService;
