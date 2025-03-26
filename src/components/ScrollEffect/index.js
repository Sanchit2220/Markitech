import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const DynamicContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledSVG = styled.svg`
  display: inline-block;
  height: 100%;
  width: 100%;
  z-index: -9999;
`;

const ScrollDraw = () => {
  const pathRef = useRef(null);
  const directionRef = useRef(1); // Use ref instead of state

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      let scrollPercentage = scrollTop / scrollHeight;

      const speedFactor = 8; // Adjust speed
      let drawLength = scrollPercentage * pathLength * speedFactor;

      if (scrollPercentage >= 1) {
        directionRef.current = -1; // Change direction when fully drawn
      } else if (scrollPercentage <= 0) {
        directionRef.current = 1; // Reset direction when at the top
      }

      path.style.strokeDashoffset =
        directionRef.current === 1 ? pathLength - drawLength : drawLength;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <DynamicContainer>
      <StyledSVG preserveAspectRatio="none" viewBox="-100 -500 996 780">
        <path
          ref={pathRef}
          d="M977.511 213.655C948.203 129.933 878.192 61.1163 793.426 34.9697C708.661 8.82299 611.207 26.6431 542.302 82.5019C473.397 138.361 435.708 231.026 447.799 318.915C454.711 369.083 477.834 418.006 516.778 450.4C555.703 482.803 611.115 496.59 659.069 480.281C707.006 463.981 743.757 415.371 740.676 364.827C738.004 320.922 708.365 283.275 675.42 254.13C590.199 178.747 470.05 140.575 358.895 164.783C247.747 189.009 150.941 279.919 130.794 391.891C110.648 503.864 176.245 628.411 283.839 665.394C337.637 683.885 409.074 674.002 433.714 622.726C456.933 574.402 426.928 517.188 390.449 477.879C325.201 407.595 235.718 360.241 140.906 345.848C56.5339 333.037 -39.8253 350.869 -92.1104 418.318C-135.832 474.727 -138.683 556.66 -107.958 621.081C-77.2316 685.502 -17.0173 732.835 49.6555 758.274"
          stroke="blue"
          strokeWidth="25"
          fill="none"
        />
      </StyledSVG>
    </DynamicContainer>
  );
};

export default ScrollDraw;
