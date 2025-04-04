 
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
