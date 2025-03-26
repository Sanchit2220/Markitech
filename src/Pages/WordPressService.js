//This is home page, It will contains all the sections require in this page.

//Import all the require sections here

import styled from "styled-components";
 import ServicePage from "../Sections/Services";
 import ServiceAnimationComponent from "../AllServices/webDevelopment";
import WordPressPage from "../AllServices/WordPress";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const WordPressService = () => {
  return (
    <Container>
   
     <WordPressPage/>
        </Container>
  );
};

export default WordPressService;
