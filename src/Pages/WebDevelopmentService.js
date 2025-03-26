//This is home page, It will contains all the sections require in this page.

//Import all the require sections here

import styled from "styled-components";
 import ServicePage from "../Sections/Services";
 import ServiceAnimationComponent from "../AllServices/webDevelopment";
import WebDevelopment from "../AllServices/webDevelopment";
import webdev from "../assets/image1.svg"
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;
const dataset1 = [
  { place: 'Switzerland Alps', title: 'SAINT', title2: 'ANTONIEN', description: 'Tucked away in the Switzerland Alps...', image: {webdev} },
  { place: 'French Riviera', title: 'COTE', title2: "D'AZUR", description: 'The French Riviera is known for its stunning coastlines...', image:{webdev} },
];


const WebDevelopmentService = () => {
  return (
    <Container>
   <WebDevelopment />

     
        </Container>
  );
};

export default WebDevelopmentService;
