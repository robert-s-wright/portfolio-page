import React from "react";

import styles from "./Footer.module.css";

import reactLogo from "./../../logo.svg";

function Footer(props) {
  const { lightMode } = props;

  return (
    <div
      className={[
        styles.container,
        lightMode ? styles.light : styles.dark,
      ].join(" ")}
    >
      <div>
        Robbie Wright
        <br />
        2022
      </div>
      <div className={styles.madeWith}>
        Made using React
        <img
          src={reactLogo}
          alt="React Logo"
          className={styles.reactLogo}
        />
      </div>
    </div>
  );
}

export default Footer;
