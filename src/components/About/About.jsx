import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3,
  faJsSquare,
  faReact,
  faGithub,
  faNodeJs,
  faEnvira,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./About.module.css";

function About(props) {
  const { lightMode, showNavOnScroll } = props;

  return (
    <div
      className={[
        styles.container,
        lightMode ? styles.light : styles.dark,
        showNavOnScroll ? styles.showNavOnScroll : "",
      ].join(" ")}
    >
      <h1>About</h1>
      <div className={styles.content}>
        <p>
          I dipped my toe in the programming pool at the beginning of 2020 with
          the intention of enrolling in a coding bootcamp. I began learning
          HTML, CSS, and a little bit of Javascript on my own via Free Code
          Camp, but when Covid-19 became a global issue, all bootcamps stopped
          offering in person classes, going totally remote. I had a hard time
          justifying the $10,000+ expense without in person instruction and a
          location where I could interact with peers and focus on completing the
          course, so I put it on pause.
        </p>
        <p>
          Fast forward to the summer of 2022, I was looking for a new position
          in manufacturing engineering, the industry I commited the last 10
          years of my life to. Having seen so many factories stagnate, with
          increased offshoring of many processes that were previously domestic,
          I decided now was the time to commit to following my programming path.
        </p>

        <p>
          I attempted to learn coding at a technical institute where I now
          reside in Sweden, but most schools require a full year of Swedish
          language school. I decided I could better utilize that time to teach
          myself programming utilizing online resources instead.
        </p>
        <p>
          Since August 2022, I have worked with HTML, CSS, Javascript, NodeJS,
          MongoDB, and React.
        </p>
        <p>
          Please also send me any questions or comments and I'll do my best to
          respond!
        </p>
      </div>
      <div className={styles.skills}>
        <FontAwesomeIcon icon={faHtml5} />
        <FontAwesomeIcon icon={faCss3} />
        <FontAwesomeIcon icon={faJsSquare} />
        <FontAwesomeIcon icon={faReact} />
        <FontAwesomeIcon icon={faNodeJs} />
        <FontAwesomeIcon icon={faEnvira} />
        <FontAwesomeIcon icon={faGithub} />
      </div>
    </div>
  );
}

export default About;
