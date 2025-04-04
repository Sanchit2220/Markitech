 
import styled from "styled-components";
import Signup from "../components/Signup";
 const Container = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 /* position: relative; */
`;

const SignupPage = () => {
 return (
   
   <Container>
<Signup/> 
   </Container>
 );
};

export default SignupPage;
