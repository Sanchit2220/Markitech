/* eslint-disable react-hooks/exhaustive-deps */
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import v1 from "../../assets/video/Skate - 49791.mp4";
import v2 from "../../assets/video/Scuba Diving - 699.mp4";

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background-color: var(--white);
  overflow: hidden;
`;

const V1 = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: bottom;
  z-index: 2;
`;

const V2 = styled.video`
  position: absolute;
  top: 0;
  right: 40%;
  width: 60%;
  height: 1auto;

  z-index: 1;

  @media screen and (max-width: 30em) {
    width: 100%;
    right: 0;
    top: 10%;
  }
`;

const TextContainer = styled.div`
  width: 30%;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8); /* Slight background for visibility */
  padding: 1rem;
  border-radius: 10px;
 
  @media screen and (max-width: 48em) {
    width: 40%;
    right: 3%;
  }
  @media screen and (max-width: 30em) {
    width: 50%;
    right: 2%;
    top: 60%;
  }
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  justify-content :center;
  line-height: 1.5;
`;

const CameraSection = () => {
  const sectionRef = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const Elem = sectionRef.current;
    const video1Elem = videoRef1.current;
    const video2Elem = videoRef2.current;

    // Pin the section
    gsap.to(Elem, {
      scrollTrigger: {
        trigger: Elem,
        start: "top top",
        end: `bottom+=500 bottom`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    let t2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: Elem,
          start: "top top",
          end: `bottom+=500 bottom`,
          scrub: 1,
        },
      })
      .to(video1Elem, { scale: 0.3 }, "key1")
      .to(video2Elem, { scale: 0.6 }, "key1")
      .fromTo(
        textRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      );

    return () => {
      if (t2) t2.kill();
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <V1 ref={videoRef1} src={v1} type="video/mp4" autoPlay muted loop />
      <V2 ref={videoRef2} src={v2} type="video/mp4" autoPlay muted loop />
      <TextContainer ref={textRef}>
        <Paragraph>
          Experience the thrill of adventure with stunning visuals that take you
          on a journey beyond imagination.  Experience the thrill of adventure with stunning visuals that take you
          on a journey beyond imagination.  Experience the thrill of adventure with stunning visuals that take you
          on a journey beyond imagination.  Experience the thrill of adventure with stunning visuals that take you
          on a journey beyond imagination.
        </Paragraph>
      </TextContainer>
    </Section>
  );
};

export default CameraSection;
