 
 import ServicePage from "../Sections/Services";
import styled from "styled-components";
 import FallingText from "../ServiceAnimation/ServiceAnimation";
 const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
  margin-bottom:20px;
`;

const Services = () => {
  return (
    
    <Container>
<ServicePage/>
<FallingText
  text={`React Bits is a library of animated and interactive React components designed to streamline UI development animated and interactive React components designed to streamline UI deve and simplify your workflow Bits is a library of animated and interactive React components designed to streamlineUI development animated and interactive React components designed to streamline UI deve and simplify your workflow Bits is a animated and interactive React components designed to streamline UI deve and simplify your workflow Bits is a library of animated and interactive React components designed to streamline development animated and interactive React components designed to streamline UI deve and simplify your workflow Bits is a library of animated and interactive React components designed to streamline UI.`}
  highlightWords={["React", "Bits", "animated", "components", "simplify","simplify","simplify","simplify","components", "simplify","simplify","simplify","simplify","React", "Bits", "animated", "components", "simplify","simplify","simplify","simplify","components" ]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>
    </Container>
  );
};

export default Services;
