//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
import AboutPage from "../components/AboutPage";
import styled from "styled-components";

 const Container = styled.div`
margin :0;
padding:0;
`;

const About = () => {
  return (
    
    <Container>
<AboutPage/>
 
    </Container>
  );
};

export default About;
