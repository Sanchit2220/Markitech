 

import styled from "styled-components";
 
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
