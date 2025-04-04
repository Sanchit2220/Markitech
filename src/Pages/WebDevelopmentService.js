
import styled from "styled-components";
import WebDevelopment from "../AllServices/webDevelopment";

 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;



const WebDevelopmentService = () => {
  return (
    <Container>
   <WebDevelopment />

     
        </Container>
  );
};

export default WebDevelopmentService;
