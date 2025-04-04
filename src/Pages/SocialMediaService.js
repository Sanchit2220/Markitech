//This is home page, It will contains all the sections require in this page.

//Import all the require sections here

import styled from "styled-components";
import SocialMediaPage from "../AllServices/SocialMedia";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const SocialMediaService = () => {
  return (
    <Container>
   
     <SocialMediaPage/>
        </Container>
  );
};

export default SocialMediaService;
