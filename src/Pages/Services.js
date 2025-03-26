//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
 import SparkleButton from "../components/SparkleButton";
import ServicePage from "../Sections/Services";
import styled from "styled-components";
 
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
<ServicePage/>
 
    </Container>
  );
};

export default Home;
