import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Contact from '../../Sections/Contact';

const ContactUsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background: #f9f9f9;
  min-height: 100vh;
`;

const CardsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top:10vh;
`;

const CardWrapper = styled.div`
  width: 48%;
  height: 250px;
  perspective: 1200px;
  cursor: pointer;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s, width 0.3s, height 0.3s;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 1.3em;
`;

const CardFront = styled(CardFace)`
  background: white;
  color: black;
`;

const CardBack = styled(CardFace)`
  background: black;
  color: white;
  transform: rotateY(180deg);
`;

const FormContainer = styled.div`
  width: 60%;
  height: 100%;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`;

const ContactPage = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    if (flippedIndex !== null) {
      const timer = setTimeout(() => {
        setFlippedIndex(null); // Reset the flipped card after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clean up timer
    }
  }, [flippedIndex]);

  return (
    <ContactUsContainer>
      <CardsContainer>
        {['Our Address', 'Email', 'Phone', 'Working Hours'].map((title, index) => (
          <CardWrapper key={index} onClick={() => setFlippedIndex(index)}>
            <CardInner isFlipped={flippedIndex === index}>
              <CardFront>
                <h3>{title}</h3>
              </CardFront>
              <CardBack>
                <p>
                  {title === 'Our Address' && '123 Main Street, City, Country'}
                  {title === 'Email' && 'contact@example.com'}
                  {title === 'Phone' && '+123 456 7890'}
                  {title === 'Working Hours' && 'Mon - Fri: 9:00 AM - 6:00 PM'}
                </p>
              </CardBack>
            </CardInner>
          </CardWrapper>
        ))}
      </CardsContainer>
      <FormContainer>
        <Contact />
      </FormContainer>
    </ContactUsContainer>
  );
};

export default ContactPage;
