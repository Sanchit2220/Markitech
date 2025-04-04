 

import styled from "styled-components";
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
