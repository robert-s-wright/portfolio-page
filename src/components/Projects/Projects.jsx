import React, { useState } from "react";

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

import { faLink } from "@fortawesome/free-solid-svg-icons";

import Carousel from "react-bootstrap/Carousel";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  ThemeProvider,
  // makeStyles,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./Projects.module.css";
import colors from "./../../vars.scss";
import theme from "./../../muiTheme";

import hiltiHome from "../../images/hiltihome.PNG";
import hiltiMobile from "../../images/hiltihome-mobile.PNG";

import monthView from "../../images/calendarApp/monthview.PNG";
import addClub from "../../images/calendarApp/addclub.PNG";
import eventView from "../../images/calendarApp/eventview.PNG";
import register from "../../images/calendarApp/register.PNG";

// import "bootstrap/dist/css/bootstrap.min.css";

function Projects(props) {
  const { lightMode, showNavOnScroll, mobileView } = props;

  const [expandedAdvProject, setExpandedAdvProject] = useState(null);

  const [expandedSimpleProject, setExpandedSimpleProject] = useState(0);

  return (
    <div
      className={[
        styles.container,
        lightMode ? styles.light : styles.dark,
        showNavOnScroll ? styles.showNavOnScroll : "",
      ].join(" ")}
    >
      <h1>Projects</h1>
      {/* <h2>Advanced Projects</h2> */}

      <ThemeProvider theme={theme}>
        <Stack
          m={2}
          gap={2}
          direction={{ sm: "column", md: "row" }}
          alignItems="center"
        >
          <Accordion
            sx={{ width: "100%" }}
            expanded={expandedAdvProject === 1}
            className={styles.MuiAccordion}
            disableGutters={true}
            onChange={() =>
              setExpandedAdvProject(expandedAdvProject === 1 ? null : 1)
            }
          >
            <AccordionSummary
              className={styles.MuiAccordionSummary}
              expandIcon={
                <ExpandMoreIcon
                  className={styles.expandIconWrapper}
                  fontSize="large"
                />
              }
            >
              <h3>BJJ Scheduling App</h3>
            </AccordionSummary>
            <AccordionDetails className={styles.MuiCollapse}>
              <img
                className=" w-100"
                src={eventView}
                alt="Second slide"
              />

              <div className={styles.content}>
                I made the BJJ calendar application to assist
                Brazilian-Jiu-Jitsu clubs and athletes with scheduling and
                viewing training sessions and seminars. Most gyms use generic
                scheduling software that requires significant customization to
                display desirable details and information.
                <div className={styles.projectSubtitle}>Details</div>
                <ul>
                  <li>Frontend: ReactJS, React Bootstrap, MaterialUI</li>
                  <li>Backend: NodeJS</li>
                  <li>Database: MongoDB</li>
                </ul>
                <div className={styles.projectSubtitle}>Functionality</div>
                <ul>
                  <li>
                    JSON web token authorization with password encryption using
                    bcrypt
                  </li>
                  <li>
                    User/club relation with read/write access granted/removed by
                    administrator
                  </li>
                  <li>Input validation during registration</li>
                </ul>
                <div className={styles.projectSubtitle}>
                  Planned Enhancements
                </div>
                <ul>
                  <li>Adapt to React Native for mobile use</li>
                  <li>Athlete check in at session using location data</li>
                  <li>
                    Push notifications to alert athletes of day's training
                    sessions
                  </li>
                  <li>
                    Data collection for users and coaches to analyze activity
                  </li>
                  <li>Bulk/recurring training session creation tool</li>
                </ul>
              </div>
              <div className={styles.icons}>
                <FontAwesomeIcon
                  icon={faReact}
                  className={styles.react}
                />
                <FontAwesomeIcon
                  icon={faNodeJs}
                  className={styles.node}
                />
                <FontAwesomeIcon
                  icon={faEnvira}
                  className={styles.mongodb}
                />
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{ width: "100%" }}
            expanded={expandedAdvProject === 2}
            className={styles.MuiAccordion}
            disableGutters={true}
            onChange={() =>
              setExpandedAdvProject(expandedAdvProject === 2 ? null : 2)
            }
          >
            <AccordionSummary
              className={styles.MuiAccordionSummary}
              expandIcon={
                <ExpandMoreIcon
                  className={styles.expandIconWrapper}
                  fontSize="large"
                />
              }
            >
              <h3>Hilti BJJ Website</h3>
            </AccordionSummary>
            <AccordionDetails className={styles.MuiCollapse}>
              <img
                src={hiltiHome}
                alt="Hilti BJJ HomePage"
              />
              <div className={styles.content}>
                Hilti BJJ's website was created to replace a dated wordpress
                site that lacked mobile responsiveness. I extracted all the
                information from the original site and created a new 8 page site
                using HTML, CSS, and Javascript.
              </div>
              <a
                href="https://www.hiltieskilstuna.se"
                target="blank"
              >
                <FontAwesomeIcon
                  icon={faLink}
                  className={styles.link}
                />
              </a>
              <div className={styles.icons}>
                <FontAwesomeIcon
                  icon={faHtml5}
                  className={styles.html5}
                />
                <FontAwesomeIcon
                  icon={faCss3}
                  className={styles.css3}
                />
                <FontAwesomeIcon
                  icon={faJsSquare}
                  className={styles.js}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </Stack>

        {/* <h2>Simple Projects</h2>
        <div> Coming soon...</div>
        <br /> */}

        {/* <Stack
          m={2}
          gap={3}
          direction={{ sm: "column", md: "row" }}
          alignItems="center"
        >
          <Accordion
            expanded={expandedSimpleProject === 1}
            className={styles.MuiAccordion}
            disableGutters={true}
            onChange={() =>
              setExpandedSimpleProject(expandedSimpleProject === 1 ? null : 1)
            }
          >
            <AccordionSummary
              className={styles.MuiAccordionSummary}
              expandIcon={
                <ExpandMoreIcon className={styles.expandIconWrapper} />
              }
            >
              <h3>Hilti BJJ Website</h3>
            </AccordionSummary>
            <AccordionDetails className={styles.MuiCollapse}>
              <img
                src={hiltiHome}
                alt="Hilti BJJ HomePage"
              />
              Hilti BJJ's website was created to replace a dated wordpress site
              that lacked mobile responsiveness. I extracted all the information
              from the original site and created a new 8 page site using HTML,
              CSS, and Javascript.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedSimpleProject === 2}
            className={styles.MuiAccordion}
            disableGutters={true}
            onChange={() =>
              setExpandedSimpleProject(expandedSimpleProject === 2 ? null : 2)
            }
          >
            <AccordionSummary
              className={styles.MuiAccordionSummary}
              expandIcon={
                <ExpandMoreIcon className={styles.expandIconWrapper} />
              }
            >
              <h3>Hilti BJJ Website</h3>
            </AccordionSummary>

            <AccordionDetails className={styles.MuiCollapse}>
              <img
                src={hiltiHome}
                alt="Hilti BJJ HomePage"
              />
              Hilti BJJ's website was created to replace a dated wordpress site
              that lacked mobile responsiveness. I extracted all the information
              from the original site and created a new 8 page site using HTML,
              CSS, and Javascript.{" "}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedSimpleProject === 3}
            className={styles.MuiAccordion}
            disableGutters={true}
            onChange={() =>
              setExpandedSimpleProject(expandedSimpleProject === 3 ? null : 3)
            }
          >
            <AccordionSummary
              className={styles.MuiAccordionSummary}
              expandIcon={
                <ExpandMoreIcon className={styles.expandIconWrapper} />
              }
            >
              <h3>Hilti BJJ Website</h3>
            </AccordionSummary>
            <AccordionDetails className={styles.MuiCollapse}>
              <img
                src={hiltiHome}
                alt="Hilti BJJ HomePage"
              />
              Hilti BJJ's website was created to replace a dated wordpress site
              that lacked mobile responsiveness. I extracted all the information
              from the original site and created a new 8 page site using HTML,
              CSS, and Javascript.{" "}
            </AccordionDetails>
          </Accordion>
        </Stack> */}
      </ThemeProvider>
    </div>
  );
}

export default Projects;
