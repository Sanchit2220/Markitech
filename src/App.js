import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import SplashCursor from "./components/GlobalAnimation";
import Sidebar from "./components/Sidebar";
 import AddBlog from "./components/AddBlog";
const WebDevelopmentService = lazy(() => import("./Pages/WebDevelopmentService"));
const CloudDevelopment = lazy(()=> import("./Pages/CloudDevelopment"));
const AppDevelopmentService = lazy(()=> import("./Pages/AppDevelopmentService"));
const ByPerClickService = lazy(()=> import("./Pages/ByPerClickService"));
const BountyHuntingService = lazy(()=> import("./Pages/BountyHuntingService"));
const SeoService = lazy(()=> import("./Pages/SeoService"));
const SocialMediaService = lazy(()=> import("./Pages/SocialMediaService"));
const WordPressService = lazy(()=> import("./Pages/WordPressService"));
const Home = lazy(() => import("./Pages/Home")); 
const Services = lazy(() => import("./Pages/Services"));
const About = lazy(() => import("./Pages/About")); 
const Blogs = lazy(() => import("./Pages/Blogs"));
const Header = lazy(() => import("./components/Header/index"));
const Footer = lazy(() => import("./components/Footer/index"));
 const LoginPage = lazy(() => import("./Pages/Login")); 
 const Signup = lazy(() => import("./Pages/Signup"));
 const ContactUs = lazy(() => import("./Pages/ContactUs")); 
 


function Layout() {
  const location = useLocation();
  
  // Define routes where the Header should be hidden
  const hideHeaderRoutes = ["/login", "/about","/admin" ,"/signup","/add-blog"];
  
  return (
    <>
      <SplashCursor />
      <GlobalStyle />
       
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header style={{ marginBottom: "40vh" }} />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={ <ProtectedRoute><AddBlog /></ProtectedRoute>} />

        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<ProtectedRoute><Sidebar /></ProtectedRoute>} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/web-development" element={<WebDevelopmentService />} />
        
        <Route path="/services/app-development" element={<AppDevelopmentService />} />
        <Route path="/services/cloud-service" element={<CloudDevelopment />} />
        <Route path="/services/by-per-click" element={<ByPerClickService />} />
        <Route path="/services/bounty-hunting" element={<BountyHuntingService />} />
        <Route path="/services/seo-service" element={<SeoService />} />
        <Route path="/services/wordpress-development" element={<WordPressService />} />
        <Route path="/services/social-media" element={<SocialMediaService />} />
      </Routes>

      {/* You can conditionally render Footer if needed */}
     </>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    </Router>
  );
}

export default App;
