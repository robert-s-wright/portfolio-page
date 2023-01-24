import React, { useState, useEffect } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import theme from "./muiTheme";

function App() {
  const mobileWidth = 900;

  const [lightMode, setLightMode] = useState(false);
  const [showNavOnScroll, setshowNavOnScroll] = useState(true);
  const [showContactPortal, setShowContactPortal] = useState(false);
  const [mobileView, setMobileView] = useState(
    window.innerWidth > mobileWidth ? false : true
  );
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  //toggle mobile view

  useEffect(() => {
    const toggleMobile = () => {
      if (window.innerWidth < mobileWidth) {
        setMobileView(true);
      } else setMobileView(false);
    };

    window.addEventListener("resize", toggleMobile, { passive: true });

    return () => window.removeEventListener("resize", toggleMobile);
  }, [mobileView]);

  //toggle light mode

  const toggleLightMode = () => (event) => {
    if (
      (event.target.textContent === "Light" && lightMode) ||
      (event.target.textContent === "Dark" && !lightMode)
    ) {
      return;
    } else {
      setLightMode((mode) => !mode);
    }
  };

  //toggle header on scroll

  useEffect(() => {
    let currentOffset = window.pageYOffset;

    const toggleNav = () => {
      const newOffset = window.pageYOffset;
      if (newOffset > currentOffset) {
        setshowNavOnScroll(false);
      } else {
        setshowNavOnScroll(true);
      }
      currentOffset = newOffset;
    };

    window.addEventListener("scroll", toggleNav, { passive: true });
    return () => window.removeEventListener("scroll", toggleNav);
  }, [showNavOnScroll]);

  //toggle back to top button on scroll

  useEffect(() => {
    const toggleBackToTop = () => {
      if (window.pageYOffset > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    return () => window.removeEventListener("scroll", toggleBackToTop);
  }, [showBackToTop]);

  //toggle header on hover

  useEffect(() => {
    const handleMove = (event) => {
      if (event.clientY < 50) {
        setshowNavOnScroll(true);
      } else {
        return;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMove);
  }, [showNavOnScroll]);

  //toggle mobile nav visibility on resize

  useEffect(() => {
    if (!mobileView) {
      setMobileNavExpanded(false);
    }
  }, [mobileView]);

  return (
    <div
      className={`App ${lightMode ? "light" : "dark"}`}
      onScroll={(event) => console.log(window.pageYOffset)}
    >
      <Header
        lightMode={lightMode}
        setLightMode={toggleLightMode()}
        showNavOnScroll={showNavOnScroll}
        toggleContactPortal={() => setShowContactPortal((state) => !state)}
        mobileView={mobileView}
        mobileNavExpanded={mobileNavExpanded}
        toggleMobileNavExpansion={() => setMobileNavExpanded((state) => !state)}
      ></Header>

      <Welcome lightMode={lightMode}></Welcome>
      <About lightMode={lightMode}></About>
      <Projects
        lightMode={lightMode}
        mobileView={mobileView}
      ></Projects>
      <Contact
        visible={showContactPortal}
        lightMode={lightMode}
        toggleContactPortal={() => setShowContactPortal(false)}
        theme={theme}
      />

      <div className={`topBtn ${showBackToTop ? "" : "hidden"}`}>
        <a href="#">
          <ArrowUpwardIcon fontSize="large" />
        </a>
      </div>

      <Footer lightMode={lightMode}></Footer>
    </div>
  );
}

export default App;
