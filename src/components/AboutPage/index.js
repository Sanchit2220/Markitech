import React, { useEffect } from 'react';

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styled, { createGlobalStyle } from 'styled-components';

 

// Register the ScrollTrigger plugin

gsap.registerPlugin(ScrollTrigger);

 

// Global styles using styled-components

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Beth+Ellen&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Beth+Ellen&family=Chelsea+Market&display=swap');

 

  /* Global Body Styles */

  body {

    font-family: "Chelsea Market", system-ui;

    margin: 0;

    padding: 0;
    background:black;

  }

 

  /* Responsive Styles */

  @media (max-width: 1200px) {

    body {

      font-size: 28px;

    }

  }

 

  @media (max-width: 768px) {

    body {

      font-size: 24px;

      background: black;

    }

  }

 

  @media (max-width: 480px) {

    body {

      font-size: 18px;

      background: black;

    }

  }

`;

 

const Wrapper = styled.div`

  position: relative;

  width: 100%;

  z-index: 1;
  background:black;
  overflow:hidden;

`;

 

const Intro = styled.div`

  position: absolute;

  left: 0;

  top: 0;

  right: auto;

  bottom: auto;

  z-index: 2;

  display: flex;

  width: 100%;

  height: 100vh;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  color: #ff0000;

`;

 

const IntroH1 = styled.h1`

  font-size: 40px;

  font-family: "Beth Ellen", cursive;

 

  @media (max-width: 768px) {

    font-size: 30px;

  }

 

  @media (max-width: 480px) {

    font-size: 24px;

  }

`;

 

const IntroP = styled.p`

  font-size: 60px;

  font-family: "Chelsea Market", system-ui;

  font-weight: bolder;

 

  @media (max-width: 768px) {

    font-size: 50px;

  }

 

  @media (max-width: 480px) {

    font-size: 35px;

  }

`;

 

const Content = styled.div`

  .section {

    width: 100%;

    height: 100vh;
    margin-top:10vh;

  }

 

  .gradient-purple, .gradient-blue {

    height: 50vh; /* Corrected selector, added dot before class names */

  }

`;

 

const HeroSection = styled.section`

  background-image: url(https://images.unsplash.com/photo-1512747646639-ed824d861e0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);

  background-position: center center;

  background-repeat: no-repeat;

  background-size: cover;

  transition: opacity 1s ease;

 
`;

 

const ImageContainer = styled.div`

  width: 100%;

  height: 100vh;

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  z-index: 2;

  perspective: 500px;

  overflow: hidden;

`;

 

const ImageContainerImg = styled.img`

  width: 100%;

  height: 100%;

  object-fit: cover;

  object-position: center center;

  position: relative;

  z-index: 1;

`;

 

const Test = styled.div`

  position: relative;

  color: white;

  top: -30px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  max-width: 800px;

  margin: 0 auto;

  text-align: center;

  line-height: 45px;

  color: #ff9605c4;

  padding: 20px;

  z-index: 3;

 

  @media (max-width: 768px) {

    max-width: 600px;

  }

 

  @media (max-width: 480px) {

    max-width: 400px;

  }

`;

 

const AdditionalContent = styled.section`

  height: 100vh;

  background-color: rgba(0, 0, 0, 0.8);

  color: white;

  padding: 20px;

  display: flex;

  justify-content: center;

  align-items: center;

  text-align: center;

  opacity: 0;

  z-index: 3;

 

 

  @media (max-width: 768px) {

    height: 80vh;

  }

 

  @media (max-width: 480px) {

    height: 60vh;

  }

`;

 

const AdditionalText = styled.div`

  font-size: 1.5rem;

  line-height: 1.6;

  margin-top:10vh;

 

  @media (max-width: 768px) {

    font-size: 1.2rem;

  }

 

  @media (max-width: 480px) {

    font-size: 1rem;

  }

`;

 

const AboutPage = () => {

  useEffect(() => {

    const timeline = gsap

      .timeline({

        scrollTrigger: {

          trigger: '.wrapper',

          start: 'top top',

          end: 'bottom bottom',

          pin: true,

          scrub: 1,

          markers: false,

        },

      })

      .to('img', {

        scale: 4,

        z: 50,

        transformOrigin: 'center center',

        ease: 'power3.inOut',

        duration: 1,

      })

      .to(

        '.section.hero',

        {

          scale: 5,

          transformOrigin: 'center center',

          ease: 'power3.inOut',

          duration: 1,

        },

        '<'

      );

 

    gsap.utils.toArray('.section.hero').forEach((section) => {

      ScrollTrigger.create({

        trigger: section,

        start: 'top bottom',

        end: 'bottom top',

        scrub: 1,

        zindex :2,

        markers: false,

        onUpdate: (self) => {

          const opacity = Math.min(Math.max(self.progress, 0), 1);

          gsap.to(section, {

            boxShadow: `10000px 0 0 0 rgba(0,0,0,${opacity}) inset`,

            overwrite: 'auto',

          });

        },

      });

    });

 

    gsap.utils.toArray('.section.additional-content').forEach((section) => {

      ScrollTrigger.create({

        trigger: section,

        start: 'top bottom',

        end: 'bottom top',

        scrub: 1,

        markers: false,

        onUpdate: (self) => {

          const opacity = Math.min(Math.max(self.progress, 0), 1);

          gsap.to(section, {

            opacity: opacity,

            transform: `translateY(${self.progress * 50}px)`,

            overwrite: 'auto',

          });

        },

      });

    });

 

    return () => {

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      timeline.kill();

    };

  }, []);

 

  return (

    <>

      <GlobalStyle />

      <Wrapper className="wrapper">

        <Intro>

          <IntroH1>The Story of</IntroH1>

          <IntroP>something very spooky</IntroP>

        </Intro>

        <Content className="content">

          <HeroSection className="section hero" />

          <section className="section gradient-purple"></section>

          <section className="section gradient-blue">

            <Test className="test">

              <p>In the shadowed depths of yon ancient keep, </p>

              <p>lurketh secrets darker than the night.</p>

              <p>Beware, for in the forgotten corners of this cursed realm,</p>

              <p>doth dwell entities of eldritch horror,</p>

              <p>their eerie whispers echoing through the corridors like the lamentations of souls long departed.</p>

            </Test>

          </section>

          <AdditionalContent className="section additional-content">

            <AdditionalText className="additional-text">

              <p>The shadows grow deeper, the air thickens with dread,</p>

              <p>as ancient beings awaken from their cursed slumber.</p>

              <p>Do not tread lightly in these forsaken halls,</p>

              <p>for here, time itself bends and distorts under the weight of forgotten horrors.</p>

            </AdditionalText>

          </AdditionalContent>

        </Content>

        <ImageContainer className="image-container">

          <ImageContainerImg

            src="https://uploads-ssl.webflow.com/5cff83ac2044e22cb8cf2f11/5d13364599bb70e3560cc4e5_background-min%203.png"

            alt="image"

          />

        </ImageContainer>

      </Wrapper>

    </>

  );

};

 

export default AboutPage;

 