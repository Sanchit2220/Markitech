import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import { lazy, Suspense } from "react";

import ScrollDraw from "./components/ScrollEffect";
import SplashCursor from "./components/GlobalAnimation";
const WebDevelopmentService = lazy(() => import("./Pages/WebDevelopmentService"));
const CloudDevelopment = lazy(()=> import("./Pages/CloudDevelopment"))
const AppDevelopmentService = lazy(()=> import("./Pages/AppDevelopmentService"))

const ByPerClickService = lazy(()=> import("./Pages/ByPerClickService"))

const BountyHuntingService = lazy(()=> import("./Pages/BountyHuntingService"))

const SeoService = lazy(()=> import("./Pages/SeoService"))

const SocialMediaService = lazy(()=> import("./Pages/SocialMediaService"))

const WordPressService = lazy(()=> import("./Pages/WordPressService"))

// Lazy Loading Components
const Home = lazy(() => import("./Pages/Home")); 
const Services = lazy(() => import("./Pages/Services"));
const About = lazy(() => import("./Pages/About")); 
const Blogs = lazy(() => import("./Pages/Blogs")); 

 

const Header = lazy(() => import("./components/Header/index"));
const Footer = lazy(() => import("./components/Footer/index"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/index"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        
        <SplashCursor />

        <GlobalStyle />
        <ScrollToTop />
        
        <Header style={{ marginBottom: "40vh" }} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/web-development" element={<WebDevelopmentService />} />
          <Route path="/services/app-development" element={<AppDevelopmentService />} />
          <Route path="/services/cloud-Service" element={<CloudDevelopment />} />
          <Route path="/services/by-per-click" element={<ByPerClickService />} />
          <Route path="/services/bounty-hunting" element={<BountyHuntingService />} />
          <Route path="/services/seo-service" element={<SeoService />} />
          <Route path="/services/wordpress-development" element={<WordPressService />} />
          <Route path="/services/social-media" element={<SocialMediaService />} />
        </Routes>

       
      </Suspense>
    </Router>
  );
}

export default App;
