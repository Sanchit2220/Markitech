
 import styled from "styled-components";
 import Login from "../components/Login"
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const LoginPage = () => {
  return (
    
    <Container>
 <Login/> 
    </Container>
  );
};

export default LoginPage;
