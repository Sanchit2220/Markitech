import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import styled from "styled-components";
import logo1 from "../../assets/header-logo.svg";

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  background-color: transparent;
  color: var(--white);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 500;
  transition: all 0.5s;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  width: 5rem;
  height: auto;
  cursor: pointer;
  img {
    width: 13rem;
  }
`;

const MiddleContent = styled.div`
  flex-grow: 1;
  text-align: center;
  opacity: 1;
  transition: opacity 0.5s ease;
  font-size: 40px;
  font-weight: 400;
  font-family: sans-serif;
  color: black;
  width: 10vw;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: var(--purple);
  width: 10vw;
  height: 5vh;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
`;

const MobileMenu = styled.nav`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: absolute;
  top: 65%;
  right: 0;
  background-color: rgb(53 53 63 / 95%);
  border-radius: 10px;
  margin: 0.5rem;
  z-index: 1000;
  width: 20vw;
  height: 30vh;

  a {
    color: var(--white);
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0.5rem;
    cursor: pointer;
  }
`;

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  const contentRef = useRef(null);
  const location = useLocation(); // Get current route

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;
    const contentElement = contentRef.current;

    gsap.to(element, {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      padding: "1rem 2.5rem",
      borderRadius: "0 0 50px 50px",
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start: "bottom+=200 top",
        end: "+=100",
        scrub: true,
      },
    });

    gsap.to(contentElement, {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: element,
        start: "top+=50 top",
        end: "+=50",
        scrub: true,
      },
    });
  }, []);

  return (
    <Headers ref={ref}>
      <Logo>
        <img src={logo1} alt="markitech" />
      </Logo>

      {/* Middle Content is only visible on the Home page */}
      {location.pathname === "/" && (
        <MiddleContent ref={contentRef}>
          <p>
            We help brands create digital
            <br /> experiences that connect with<br /> their audience
          </p>
        </MiddleContent>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button onClick={() => setShowMenu(!showMenu)}>Menu...</Button>
        <Button>Contact Us</Button>
      </div>

      <MobileMenu show={showMenu}>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/services">Services</a>
        <a href="/blogs">Blogs</a>
{/* 
        <a href="#contact" onClick={(e) => e.preventDefault()}>
          <Button>Contact Us</Button>
        </a> */}
      </MobileMenu>
    </Headers>
  );
};

export default Header;
