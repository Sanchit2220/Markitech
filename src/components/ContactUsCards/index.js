import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, css } from 'styled-components';
import gsap from 'gsap';

// --- Styled Components Definitions ---

// Define CSS Variables
const variables = css`
  --bg: transparent;
  --logo-url: url(https://assets.codepen.io/13471/threads.svg);
  --logopng-url: url(https://assets.codepen.io/13471/threads.png);
  --ticket-url: url(https://assets.codepen.io/13471/ticket-shape.svg);
  --ar: 20 / 30;
  --gutter: 8%;

  /* GSAP controlled variables with defaults */
  --o: 0; /* Opacity */
  --p: 100%; /* Position */
  --h: 50%; /* Hue/Holo position */
  --r: 0deg; /* Rotation */
  --scale: 1; /* Scale */
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
 


  /* Optional: Add font imports if not handled elsewhere */
  /* @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Heebo:wght@400;600&display=swap'); */

  h1 { /* Basic h1 styling if needed elsewhere */
    font-family: "Roboto Mono", monospace;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 1;
    color: white;
  }
`;

// Main App Container Styling (#app) - Renamed to avoid ID conflicts
const StyledAppContainer = styled.main`
  ${variables} // Make variables available within this scope

  perspective: 1200px;
  transform: translate3d(0, 0, 0.1px); // Slight 3D positioning for children

  /* Positioning styles */
  display: grid;
  place-content: center; // Center the TicketWrapper
  overflow: hidden;
   z-index: 10; // Relative stacking context
  color: black; // Default text color (overridden inside ticket)
  font-family: "Roboto Mono", monospace;
   background-color: var(--bg); // Background for the whole container area
`;

// Ticket Container Styling (.ticket)
const TicketWrapper = styled.section`
  /* Apply rotation controlled by GSAP via parent's CSS var */
  /* Scale is managed here for responsiveness */
  transform: translate3d(0, 0, 0.1px) scale(var(--scale, 1)) rotateY(var(--r));
  transform-style: preserve-3d;
  pointer-events: auto; // Allow interaction (mouseenter/leave)

  display: grid; // Use grid for front/back overlay
  grid-area: 1/1; // Ensures front/back stack correctly if nested in another grid
  width: 200px;
  aspect-ratio: var(--ar);
  position: relative; // Needed for absolute positioning of faces

  /* Media Query for smaller screens */
  @media screen and (max-width: 450px) {
      /* Apply scale directly for responsiveness */
      transform: translate3d(0, 0, 0.1px) scale(0.75) rotateY(var(--r));
  }
`;

// Shared styles for Front and Back faces
const faceStyles = css`
  grid-area: 1/1; // Stack in the parent grid (TicketWrapper)
  background-color: #6e6176; // Base ticket color
  background-image: radial-gradient(
      circle at var(--p) 50%,
      #fff 10%,
      transparent 100%
  );
  background-size: 100% 220vh;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  display: grid; // Use grid for internal layout of face content
  backface-visibility: hidden; // Hide the back when facing away
  transform-style: preserve-3d; // Preserve 3D for children like HoloEffect
  mask-image: var(--ticket-url);
  mask-size: cover;
  mask-repeat: no-repeat;
  position: absolute; // Position faces absolutely within TicketWrapper
  inset: 0; // Cover the parent area
  overflow: hidden; // Hide overflowing content/effects if needed

  /* Shine/Glare Effect */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        -70deg,
        transparent 40%,
        rgba(255, 255, 255, 0.5) 40.5%,
        transparent 50% /* Explicit endpoint can help */
    );
    background-size: 200% 200%;
    /* GSAP controls --p for position */
    background-position: var(--p) var(--p);
    z-index: 5; /* Above face background, below content */
    /* GSAP controls --o for opacity */
    opacity: calc(var(--o) + 0.5); /* Ensure spaces in calc */
    pointer-events: none;
    border-radius: 15px; // Match parent radius
  }
`;

// Front Face Styling (.front)
const FrontFace = styled.header`
  ${faceStyles}
  /* Rotate the face itself relative to the rotating TicketWrapper */
  transform: rotateY(180deg) translateZ(0.5px);
  z-index: 1; // Lower z-index
`;

// Back Face Styling (.back)
const BackFace = styled.section`
  ${faceStyles}
  /* Rotate the face itself relative to the rotating TicketWrapper */
  transform: rotateY(0deg) translateZ(0.5px);
  z-index: 2; // Higher z-index (initially visible)
`;

// Holographic Effect (.holo)
const HoloEffect = styled.div`
  display: block;
  position: absolute;
  inset: 0;
  border-radius: 15px; // Match parent face

  /* Color definitions */
  --space: 5%;
  --red: hsl(0, 100%, 50%);
  --orange: hsl(30, 100%, 50%);
  --yellow: hsl(60, 100%, 50%);
  --green: hsl(120, 100%, 50%);
  --cyan: hsl(180, 100%, 50%);
  --blue: hsl(222, 100%, 50%);
  --purple: hsl(258, 100%, 50%);
  --magenta: hsl(300, 100%, 50%);

  /* Repeating gradient for holo effect */
  background-image: repeating-linear-gradient(
      -45deg,
      var(--red) 0%,
      var(--orange) calc(var(--space) * 1),
      var(--yellow) calc(var(--space) * 2),
      var(--green) calc(var(--space) * 3),
      var(--cyan) calc(var(--space) * 4),
      var(--blue) calc(var(--space) * 5),
      var(--purple) calc(var(--space) * 6),
      var(--magenta) calc(var(--space) * 7),
      var(--red) calc(var(--space) * 8)
  );
  background-size: 150vw 150vh;
  /* GSAP controls --h for position */
  background-position: var(--h) var(--h);
  background-repeat: no-repeat;
  mask-image: var(--logopng-url); // Use PNG mask from variable
  mask-size: 4% 4%;
  mask-repeat: repeat;
  mix-blend-mode: plus-lighter;
  filter: brightness(0.9) contrast(0.7) saturate(2);
  /* GSAP controls --o for opacity */
  opacity: var(--o);
  z-index: 1; // Below main content (logos, text)
`;

// Logo Image Styling (.logo)
const LogoImage = styled.img`
  display: block;
  max-width: 100%;
  position: relative; // Keep relative positioning by default inside grid
  z-index: 2; // Above holo effect

  /* Styles specific to logo in FrontFace */
  ${FrontFace} & {
      width: 50%;
      place-self: center; // Center within the FrontFace grid
      transform: translateY(-14%);
  }

  /* Styles specific to logo in BackFace */
  ${BackFace} & {
      position: absolute; // Position absolutely within BackFace
      right: var(--gutter);
      top: 13%;
      width: 16%;
      image-rendering: optimize-speed; /* Deprecated */
      image-rendering: crisp-edges; /* Firefox */
      image-rendering: pixelated; /* Standard */
  }
`;

// Data Section Styling (.data on back face)
const DataSection = styled.section`
  position: relative; // Keep relative positioning
  z-index: 2; // Above holo effect
  margin: 14% var(--gutter) 0; // Margin from top/sides
  text-transform: uppercase;
  color: black; // Text color

  h3 {
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
    margin: 0.2em 0;
  }

  p {
    font-size: 32px;
    font-weight: 400;
    line-height: 1;
    margin: 0.2em 0 1em;
  }

  /* Styling for contentEditable paragraphs within DataSection */
  p[contentEditable="true"] {
      outline: none;
      &:focus {
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 0 0.1em;
          border-radius: 3px;
      }
  }
`;

// QR Code Link Styling (.qr)
const QrLink = styled.a`
  max-width: 30%;
  display: block;
  margin-top: 1em; // Space above QR code

  img {
    display: block;
    max-width: 100%;
    image-rendering: optimize-speed; /* Deprecated */
    image-rendering: crisp-edges; /* Firefox */
    image-rendering: pixelated; /* Standard */
  }
`;

// Divider Styling (.divider)
const Divider = styled.aside`
  position: absolute; // Position at the bottom of the face
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18%; // Height of the divider area
  padding: 0 var(--gutter); // Padding matches data section gutters

  /* Dashed line effect using repeating gradients */
  background-image: repeating-linear-gradient(
          90deg,
          #fff0 0px, /* Transparent start */
          #fff0 8px, /* Transparent end */
          #0005 8px, /* Black with alpha start */
          #0005 16px /* Black with alpha end */
      ),
      radial-gradient(ellipse at center center, #fff0 10%, transparent 50%);
  background-size: 100% 1.5px, 250% 1.5px; /* Line thickness */
  background-repeat: no-repeat;
  /* GSAP controls --h for radial part position */
  background-position: -4px top, var(--h) top;
  background-blend-mode: overlay;

  font-size: 16px;
  font-weight: 400;
  z-index: 2; // Above background/holo
  color: black; // Default text color for divider content
`;

// Username Container Styling (.username in divider)
const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Heebo', sans-serif; // Specify Heebo font
  font-weight: 600;

  /* Style for editable span inside */
  span[contentEditable="true"] {
    outline: none;
    &:focus {
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0 0.1em;
        border-radius: 3px;
    }
  }
`;

// Profile Image Styling (.profile in divider)
const ProfileImage = styled.img`
  display: block;
  max-width: 100%;
  border-radius: 100%;
  width: 40px; // Fixed size
  height: 40px; // Ensure aspect ratio
  box-shadow: 0 0 0 1.33px black; // Outline
  margin-right: 10px; // Space before username
  image-rendering: optimize-speed;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
`;

// Verified Badge Styling (.verified in divider)
const VerifiedBadge = styled.img`
  display: block;
  max-width: 100%;
  width: 18px; // Fixed size
  margin-left: 5px; // Space after username
`;

// User Number Styling (.usernum in divider)
const UserNumber = styled.span`
  font-size: 20px;
  font-family: 'Roboto Mono', monospace; // Use monospace font

  /* Style for editable span */
  &[contentEditable="true"] {
    outline: none;
    &:focus {
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0 0.1em;
        border-radius: 3px;
    }
  }
`;


// --- React Component ---

function ThreadsTicket({
  // Destructure all props used in JSX and needed for CSS variables via defaults
  date,
  time,
  username,
  userNum,
  profileUrl,
  qrCodeUrl,
  qrCodeAlt,
  profilePicUrl,
  isVerified,
  logoUrl,
  logoPngUrl, // Used via CSS var (--logopng-url) in HoloEffect
  ticketShapeUrl, // Used via CSS var (--ticket-url) in faceStyles
  verifiedIconUrl,
}) {
  // Refs for GSAP targets and event listeners
  const appContainerRef = useRef(null); // Ref for the main container controlling variables
  const ticketWrapperRef = useRef(null); // Ref for the ticket element getting hovered

  // Refs to store GSAP timelines for cleanup and interaction
  const rotationTimeline = useRef(null);
  const opacityTimeline = useRef(null);
  const holoTimeline = useRef(null);

  useEffect(() => {
    // Ensure GSAP and refs are available
    const containerElement = appContainerRef.current;
    const ticketElement = ticketWrapperRef.current;

    if (!gsap || !containerElement || !ticketElement) {
      console.warn("GSAP or refs not ready for ThreadsTicket animation.");
      return;
    }

    const speed = 7; // Animation speed factor

    // --- Create GSAP Timelines ---
    // Target the containerElement to animate the CSS variables
    rotationTimeline.current = gsap.timeline({ repeat: -1, paused: false });
    opacityTimeline.current = gsap.timeline({ repeat: -1, paused: false });
    holoTimeline.current = gsap.timeline({ repeat: -1, paused: false });

    // Rotation (--r) and Gradient Position (--p) Timeline
    rotationTimeline.current.to(containerElement, {
        "--r": "180deg",
        "--p": "0%",
        duration: speed,
        ease: "sine.in"
    }).to(containerElement, {
        "--r": "360deg",
        "--p": "100%",
        duration: speed,
        ease: "sine.out"
    });

    // Opacity (--o) Timeline (for Holo and Shine)
    opacityTimeline.current.to(containerElement, {
        "--o": 1,
        duration: speed / 2,
        ease: "power1.in"
    }).to(containerElement, {
        "--o": 0,
        duration: speed / 2,
        ease: "power1.out"
    });

    // Holo/Gradient Position (--h) Timeline
    holoTimeline.current.to(containerElement, {
        "--h": "100%",
        duration: speed / 2,
        ease: "sine.in"
    }).to(containerElement, {
        "--h": "50%",
        duration: speed / 2,
        ease: "sine.out"
    }).to(containerElement, {
        "--h": "0%",
        duration: speed / 2,
        ease: "sine.in"
    }).to(containerElement, {
        "--h": "50%",
        duration: speed / 2,
        ease: "sine.out"
    });

    // --- Event Listeners for Hover Interaction ---
    const handleMouseEnter = () => {
      if (rotationTimeline.current) rotationTimeline.current.pause();
      if (opacityTimeline.current) opacityTimeline.current.pause();
      if (holoTimeline.current) holoTimeline.current.pause();
    };

    const handleMouseLeave = () => {
      if (rotationTimeline.current) rotationTimeline.current.play();
      if (opacityTimeline.current) opacityTimeline.current.play();
      if (holoTimeline.current) holoTimeline.current.play();
    };

    ticketElement.addEventListener('mouseenter', handleMouseEnter);
    ticketElement.addEventListener('mouseleave', handleMouseLeave);

    // --- Cleanup Function ---
    return () => {
      console.log("Cleaning up ThreadsTicket GSAP timelines and listeners.");
      // Kill timelines to stop animations and free resources
      if (rotationTimeline.current) rotationTimeline.current.kill();
      if (opacityTimeline.current) opacityTimeline.current.kill();
      if (holoTimeline.current) holoTimeline.current.kill();

      // Remove event listeners - check if element still exists
      if (ticketElement) {
         ticketElement.removeEventListener('mouseenter', handleMouseEnter);
         ticketElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <GlobalStyle /> {/* Render global styles */}
      {/* Use the container ref here */}
      <StyledAppContainer ref={appContainerRef}>
        {/* Use the ticket wrapper ref here */}
        <TicketWrapper ref={ticketWrapperRef}>
            {/* Front Face */}
            <FrontFace>
                <HoloEffect />
                <LogoImage
                    src={logoUrl}
                    alt="Threads Logo - Front"
                />
                {/* Divider on front is just for the cut-out shape */}
                <Divider />
            </FrontFace>

            {/* Back Face */}
            <BackFace>
                <HoloEffect />
                <LogoImage
                    /* className="logo-back" // Optional class if needed */
                    src={logoUrl}
                    alt="Threads Logo - Back"
                />
                <DataSection>
                    <h3>Date</h3>
                    <p contentEditable spellCheck={false}>{date}</p>
                    <h3>Time</h3>
                    <p contentEditable spellCheck={false}>{time}</p>
                    <h3>Username</h3>
                    <p contentEditable spellCheck={false}>{username}</p>
                    <QrLink
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={qrCodeUrl} alt={qrCodeAlt} />
                    </QrLink>
                </DataSection>

                {/* Divider on back contains user info */}
                <Divider>
                    <UsernameContainer>
                        <ProfileImage src={profilePicUrl} alt={`${username}'s profile picture`} />
                        <span contentEditable spellCheck={false}>{username}</span>
                        {' '} {/* Space */}
                        {isVerified && (
                            <VerifiedBadge src={verifiedIconUrl} alt="Verified Badge" />
                        )}
                    </UsernameContainer>
                    <UserNumber contentEditable spellCheck={false}>
                        {userNum}
                    </UserNumber>
                </Divider>
            </BackFace>
        </TicketWrapper>
      </StyledAppContainer>
      {/* Note: Original social icons are outside this component structure */}
      {/* You would add them separately outside <StyledAppContainer> if needed */}
    </>
  );
}

// --- PropTypes ---
ThreadsTicket.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userNum: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  qrCodeUrl: PropTypes.string.isRequired,
  qrCodeAlt: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  logoUrl: PropTypes.string.isRequired,
  logoPngUrl: PropTypes.string.isRequired, // Needed for CSS var
  ticketShapeUrl: PropTypes.string.isRequired, // Needed for CSS var
  verifiedIconUrl: PropTypes.string.isRequired,
};

// --- Default Props ---
ThreadsTicket.defaultProps = {
  date: 'Thu Jul 6',
  time: '07:30 pm',
  username: 'Simeydotme',
  userNum: '180249081',
  profileUrl: 'https://codepen.io/simeydotme',
  qrCodeUrl: 'https://assets.codepen.io/13471/simeyqr.svg',
  qrCodeAlt: 'A code to use for accessing the simeydotme codepen profile',
  profilePicUrl: 'https://assets.codepen.io/13471/internal/avatars/users/default.png',
  isVerified: true,
  logoUrl: 'https://assets.codepen.io/13471/threads.svg',
  logoPngUrl: 'https://assets.codepen.io/13471/threads.png',
  ticketShapeUrl: 'https://assets.codepen.io/13471/ticket-shape.svg',
  verifiedIconUrl: 'https://assets.codepen.io/13471/verified.png',
};

export default ThreadsTicket;