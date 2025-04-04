 

import styled from "styled-components";
import AppDevelopmentPage from "../AllServices/AppDevelopment";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const AppDevelopmentService = () => {
  return (
    <Container>
   
     <AppDevelopmentPage/>
        </Container>
  );
};

export default AppDevelopmentService;
