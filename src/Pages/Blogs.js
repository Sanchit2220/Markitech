//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
import AboutPage from "../components/AboutPage";
import styled from "styled-components";
import Blog from "../components/Blogs"
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const Blogs = () => {
  return (
    
    <Container>
 <Blog/>
    </Container>
  );
};

export default Blogs;
