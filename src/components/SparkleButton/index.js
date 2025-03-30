import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import "./Sparkle.css"; // Ensure this file exists

const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const bounce = keyframes`
  35%, 65% {
    transform: scale(var(--scale));
  }
`;

const SparkleButton = ({ label }) => {
  useEffect(() => {
    setTimeout(() => {
      const PARTICLES = document.querySelectorAll('.particle');
      PARTICLES.forEach(P => {
        P.setAttribute('style', `
          --x: ${RANDOM(20, 80)};
          --y: ${RANDOM(20, 80)};
          --duration: ${RANDOM(6, 20)};
          --delay: ${RANDOM(1, 10)};
          --alpha: ${RANDOM(40, 90) / 100};
          --origin-x: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
          --origin-y: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
          --size: ${RANDOM(40, 90) / 100};
        `);
      });
    }, 0);
  }, []);

  return (
    <SparkleButtonWrapper>
      <StyledButton>
        <span className="spark"></span>
        <span className="backdrop"></span>
        <span className="text">{label}</span> {/* Dynamic Button Label */}
      </StyledButton>

      {/* Particle Effect
      <span aria-hidden="true" className="particle-pen">
        <svg className="particle" viewBox="0 0 15 15" fill="none">
          <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" />
        </svg>
      </span> */}
    </SparkleButtonWrapper>
  );
};

export default SparkleButton;

// Styled Components
const SparkleButtonWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  --cut: 0.1em;
  --active: 0;
  --bg: radial-gradient(40% 50% at center 100%, hsl(270 calc(var(--active) * 97%) 72% / var(--active)), transparent), 
        radial-gradient(80% 100% at center 120%, hsl(260 calc(var(--active) * 97%) 70% / var(--active)), transparent), 
        hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));

  background: var(--bg);
  font-size: 1.5rem;
  font-weight: 100;
  width: 12vw;
  height: 50px;
  margin-top: 10px;
  border: 0;
  cursor: pointer;
  padding: 0.9em 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25em;
  white-space: nowrap;
  border-radius: 100px;
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
  transform: scale(calc(1 + (var(--active) * 0.1)));


&:before {
   content: "";

    position: absolute;

    inset: -0.25em;

    z-index: -1;

    border: 0.25em solid hsl(260 97% 50% / 0.5);

    border-radius: 100px;

    opacity: var(--active, 0);

    transition: opacity var(--transition);
}
  &:active {
    transform: scale(1);
  }

  &:hover,
  &:focus-visible {
    path {
      animation-name: ${bounce};
    }
  }

  svg {
    inline-size: 1.25em;
    translate: -25% -5%;
  }
`;
