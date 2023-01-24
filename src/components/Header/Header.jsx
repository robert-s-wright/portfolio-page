import React, { useRef, useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";

import styles from "./Header.module.css";

import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness3Icon from "@mui/icons-material/Brightness3";

import cv from "./../../CVRobertWright10012023.pdf";

function Header(props) {
  const {
    lightMode,
    setLightMode,
    showNavOnScroll,
    toggleContactPortal,
    mobileView,
    mobileNavExpanded,
    toggleMobileNavExpansion,
  } = props;

  const [headerBackground, setHeaderBackground] = useState(false);

  const lightModeTransitions = {
    transitionName: "fade",
    in: 500,
    out: 500,
  };

  const nodeRef = useRef(null);

  useEffect(() => {
    const toggleHeaderBackground = () => {
      if (window.pageYOffset > 500) {
        setHeaderBackground(true);
      } else {
        setHeaderBackground(false);
      }
    };

    window.addEventListener("scroll", toggleHeaderBackground, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", toggleHeaderBackground);
  }, [headerBackground]);

  return (
    <div
      className={[
        styles.container,
        lightMode ? styles.light : styles.dark,
        (!showNavOnScroll && !mobileNavExpanded) ||
        (!showNavOnScroll && !mobileView)
          ? styles.hideHeader
          : "",
        mobileView ? styles.mobile : styles.desktop,
        headerBackground ? styles.opaque : "",
      ].join(" ")}
    >
      <div></div>

      {mobileView ? (
        <>
          <div
            className={`${styles.hamburgerBtn} ${
              mobileNavExpanded ? styles.navOpen : ""
            }`}
            onClick={toggleMobileNavExpansion}
          >
            <div className={styles.hamburgerLine}></div>
          </div>
          <nav
            className={[
              !mobileNavExpanded ? styles.navHidden : "",
              headerBackground ? styles.opaque : "",
            ].join(" ")}
          >
            {/* <button className={styles.navBtn}>Home</button> */}
            <a
              href={cv}
              className={styles.navBtn}
              target="_blank"
            >
              Resume
            </a>
            <button
              className={styles.navBtn}
              onClick={() => {
                toggleContactPortal();
                toggleMobileNavExpansion();
              }}
            >
              Contact
            </button>
            <div className={styles.modeSelector}>
              <div className={styles.dot}>
                <CSSTransition
                  in={lightMode}
                  timeout={100}
                  classNames={{
                    enterActive: styles.enterActive,
                    enterDone: styles.enterDone,
                    exitActive: styles.exitActive,
                    exitDone: styles.exitDone,
                  }}
                  nodeRef={nodeRef}
                  unmountOnExit
                >
                  <BrightnessHighIcon className={styles.start} />
                </CSSTransition>

                <CSSTransition
                  in={!lightMode}
                  timeout={100}
                  classNames={{
                    enterActive: styles.enterActive,
                    enterDone: styles.enterDone,
                    exitActive: styles.exitActive,
                    exitDone: styles.exitDone,
                  }}
                  nodeRef={nodeRef}
                  unmountOnExit
                >
                  <Brightness3Icon className={styles.end} />
                </CSSTransition>
              </div>

              <div className={styles.modes}>
                <span
                  className={styles.modeButton}
                  onClick={setLightMode}
                >
                  Light
                </span>
                <span
                  className={styles.modeButton}
                  onClick={setLightMode}
                >
                  Dark
                </span>
              </div>
            </div>
          </nav>
        </>
      ) : null}
      {!mobileView ? (
        <nav>
          {/* <button className={styles.navBtn}>Home</button> */}
          <a
            href={cv}
            className={styles.navBtn}
            target="_blank"
          >
            Resume
          </a>
          <button
            className={styles.navBtn}
            onClick={() => {
              toggleContactPortal();
              toggleMobileNavExpansion();
            }}
          >
            Contact
          </button>
          <div className={styles.modeSelector}>
            <div className={styles.dot}>
              <CSSTransition
                in={lightMode}
                timeout={100}
                classNames={{
                  enterActive: styles.enterActive,
                  enterDone: styles.enterDone,
                  exitActive: styles.exitActive,
                  exitDone: styles.exitDone,
                }}
                nodeRef={nodeRef}
                unmountOnExit
              >
                <BrightnessHighIcon className={styles.start} />
              </CSSTransition>

              <CSSTransition
                in={!lightMode}
                timeout={100}
                classNames={{
                  enterActive: styles.enterActive,
                  enterDone: styles.enterDone,
                  exitActive: styles.exitActive,
                  exitDone: styles.exitDone,
                }}
                nodeRef={nodeRef}
                unmountOnExit
              >
                <Brightness3Icon className={styles.end} />
              </CSSTransition>
            </div>

            <div className={styles.modes}>
              <span
                className={styles.modeButton}
                onClick={setLightMode}
              >
                Light
              </span>
              <span
                className={styles.modeButton}
                onClick={setLightMode}
              >
                Dark
              </span>
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  );
}

export default Header;
