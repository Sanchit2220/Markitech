//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
import styled from "styled-components";
import Login from "../components/Login"
import Contact from "../Sections/Contact";
import ContactPage from "../components/ContactUs";
const Container = styled.div`
 
`;

const ContactUs = () => {
 return (
   
   <Container>
   <ContactPage/>
   </Container>
 );
};

export default ContactUs;
