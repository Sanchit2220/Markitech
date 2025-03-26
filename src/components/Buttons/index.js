import React from 'react';
import styled, { keyframes } from 'styled-components';

const maskAnimation = keyframes`
    0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
  100% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }

`;

const AnimatedBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  background-color: black; /* Solid black background */
  mask-image: linear-gradient(45deg, transparent 30%, white 50%, transparent 70%); /* More pronounced stripe */
  mask-size: 300% 300%; /* Adjust the size to match animation */
  mask-repeat: no-repeat;
  animation: ${maskAnimation} 1s linear infinite;
`;

const ButtonContainer = styled.button`
 margin-top:20px;
  background-color: #f1f1f1;
  color: black;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #740979;
    color: white;
    box-shadow: 0 0 5px #9C27B0;
    outline: none;

    ${AnimatedBorder} {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #BA68C8;
  }

  &:active {
    background-color: #6A1B9A;
  }
  
 
`;

const SparkleIcon = styled.span`
  margin-right: 8px;
  font-size: 1.2em;
`;

const MyButton = ({ onClick, children }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <AnimatedBorder />
      
      {children}
    </ButtonContainer>
  );
};

export default MyButton;
 