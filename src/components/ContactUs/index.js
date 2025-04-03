import React from 'react'; // Removed useState, useEffect as they are not used here
import styled from 'styled-components';
import Contact from '../../Sections/Contact'; // Assuming Contact component exists
import ThreadsTicket from '../ContactUsCards'; // Assuming ThreadsTicket component exists and is correctly imported

// Main container for the whole page section
const ContactUsContainer = styled.div`
  display: flex;
  justify-content: space-around; /* Adjust spacing between ticket grid and form */
  align-items: flex-start; /* Align items at the top */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  padding: 40px;
  background: #f9f9f9; // Example background
  min-height: 100vh;
  gap: 30px; /* Add gap between the ticket grid and the form */
`;

// NEW: Container specifically for the ThreadsTicket components
const TicketsGridContainer = styled.div`
   display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Spacing between tickets */
  justify-content: center; /* Center tickets within the grid container */

  /* Adjust width for larger screens to sit next to the form */
  @media (min-width: 1024px) {
    width: 50%; /* Adjust width to fit alongside the form */
    justify-content: flex-start; /* Align tickets to the start */
  }

  /* Target direct children (ThreadsTicket's wrapper) if needed, but ThreadsTicket should handle its own size */
  & > * {
    flex-basis: calc(50% - 10px); /* Try to fit 2 per line, accounting for gap */
    max-width: calc(50% - 10px); /* Ensure max width respects the basis */

    /* Adjust for smaller screens if tickets become too small */
    @media (max-width: 600px) {
       flex-basis: 100%;
       max-width: 100%; /* Full width on small screens */
    }
  }
`;

// Container for the Contact Form
const FormContainer = styled.div`
  width: 100%; /* Take full width initially */
  max-width: 40vw; /* Max width for the form */
  padding: 0px;
  display: flex;
  justify-content: center; /* Center the Contact component */

  /* Adjust width for larger screens */
  @media (min-width: 1024px) {
    width: 70%; /* Adjust width */
  }
`;

const ContactPage = () => {
  // Removed the flipping logic as it wasn't connected to ThreadsTicket
  // const [flippedIndex, setFlippedIndex] = useState(null);
  // useEffect(() => { ... }, [flippedIndex]);

  return (
    <ContactUsContainer>
      {/* Wrap the ThreadsTicket components in the new grid container */}
      <TicketsGridContainer>
        <ThreadsTicket/>
        <ThreadsTicket />
        <ThreadsTicket/>
        <ThreadsTicket />
      </TicketsGridContainer>

      <FormContainer>
        <Contact />
      </FormContainer>
    </ContactUsContainer>
  );
};

export default ContactPage;