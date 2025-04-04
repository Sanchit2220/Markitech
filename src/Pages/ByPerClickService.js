
import styled from "styled-components";
import BountyHuntingPage from "../AllServices/BountyHunting";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const ByPerClickService = () => {
  return (
    <Container>
   
     <BountyHuntingPage/>
        </Container>
  );
};

export default ByPerClickService;
