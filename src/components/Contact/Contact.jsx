import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import styles from "./Contact.module.css";

import theme from "./../../muiTheme";

import { Input, TextField, withStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

function Contact(props, { classes }) {
  const { visible, toggleContactPortal, lightMode, theme } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mailSent: false,
    error: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: null,
    email: null,
    message: null,
  });

  //handle invalid email entry

  useEffect(() => {
    if (/\S+@\S+\.\S+/.test(formData.email)) {
      setFormErrors((state) => {
        return { ...state, email: null };
      });
    } else {
      setFormErrors((state) => {
        return { ...state, email: "Please enter a valid e-mail address" };
      });
    }
  }, [formData.email]);

  //handle invalid name

  useEffect(() => {
    if (formData.name === "") {
      setFormErrors((state) => {
        return { ...state, name: "Please enter a valid name" };
      });
    } else {
      setFormErrors((state) => {
        return { ...state, name: null };
      });
    }
  }, [formData.name]);

  //handle invalid message

  useEffect(() => {
    if (formData.message === "") {
      setFormErrors((state) => {
        return { ...state, message: "Please enter a valid message" };
      });
    } else {
      setFormErrors((state) => {
        return { ...state, message: null };
      });
    }
  }, [formData.message]);

  //set initial form errors

  useEffect(() => {
    setFormErrors(() => {
      return { name: null, email: null, message: null };
    });
  }, []);

  //remove errors after sending message

  useEffect(() => {
    if (formData.mailSent) {
      setFormErrors({
        name: null,
        email: null,
        message: null,
      });
    }
  }, [formData.mailSent]);

  //submission and api call

  const handleSubmit = (event) => {
    event.preventDefault();

    // const API_URL = "http://localhost/portfolio/api/index.php";
    const API_URL = "./api_email/index.php";

    axios
      .post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      })

      .then((result) => {
        setFormData((state) => {
          return {
            ...state,
            name: "",
            email: "",
            message: "",
            mailSent: result.data.sent,
            error: null,
          };
        });

        setTimeout(() => {
          setFormData((state) => {
            return { ...state, mailSent: false };
          });
        }, 5000);
      })
      .catch((error) =>
        setFormData((state) => {
          return { ...state, error: error.data.error };
        })
      );
  };

  const inputStyling = {
    input: {
      color: lightMode ? "darkMain.main" : "darkHighlight2.main",
      fontWeight: "600",
      fontSize: "1.3em",
      p: 0.5,

      appearance: "none !important",
      [theme.breakpoints.down("900")]: {
        fontSize: "1em",
      },
      [theme.breakpoints.down("600")]: {
        fontSize: ".8em",
      },
      "&:-webkit-autofill": {
        fontFamily: `"Poiret One", cursive`,

        WebkitBoxShadow: `0 0 0 300px ${
          lightMode
            ? theme.palette.darkHighlight2.main
            : theme.palette.darkMain.main
        } inset !important`,
        WebkitTextFillColor: `${
          lightMode
            ? theme.palette.darkMain.main
            : theme.palette.darkHighlight2.main
        } !important`,
      },
    },

    "& .MuiInputBase-input": {
      boxShadow: "none !important",
      border: "none",
      backgroundColor: "transparent",
    },

    "& .MuiFormHelperText-root": {
      color: "hsl(0, 100%, 80%);",
      fontWeight: "600",
      fontSize: ".9em",
    },
    label: {
      color: lightMode ? "darkMain.main" : "darkHighlight2.main",
      fontSize: "1.3em",
      [theme.breakpoints.down("900")]: {
        fontSize: "1.2em",
      },
      marginBottom: "10px",
      fontWeight: "bold",
    },
    textArea: {
      color: lightMode ? "darkMain.main" : "darkHighlight2.main",
      fontSize: "1.3em",
      [theme.breakpoints.down("900")]: {
        fontSize: "1em",
      },
      [theme.breakpoints.down("600")]: {
        fontSize: ".8em",
      },
      fontWeight: "600",
      p: 0.5,
    },
    error: {},
    width: "80%",
    m: 1,
  };

  return ReactDOM.createPortal(
    <div
      className={[
        styles.container,
        visible ? "" : styles.hidden,
        lightMode ? styles.light : styles.dark,
      ].join(" ")}
    >
      <ThemeProvider theme={theme}>
        <CloseIcon
          onClick={toggleContactPortal}
          sx={{
            color: "darkHighlight1.main",
            position: "absolute",
            top: "0.7em",
            right: "1em",
            transform: "translateX(50%)",
            transition: ".3s all ease",
            zIndex: "2",
            "&:hover": {
              color: "darkHighlight4.main",
              cursor: "pointer",
              scale: "110%",
            },
          }}
          fontSize="large"
        />

        <h2>Please send me a message!</h2>
        <div className={styles.sentConfirmation}>
          {formData.mailSent
            ? "Thank you for contacting me, I'll respond shortly!"
            : null}
        </div>
        <div className={styles.sentError}>
          {formData.error ? formData.error : null}
        </div>
        <form action="">
          <TextField
            color={lightMode ? "darkHighlight4" : "darkHighlight3"}
            variant="standard"
            sx={inputStyling}
            label="Name"
            name="name"
            required
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
            value={formData.name}
            helperText={formErrors.name ? formErrors.name : null}
            autoFocus={true}
          />
          <TextField
            color={lightMode ? "darkHighlight4" : "darkHighlight3"}
            variant="standard"
            sx={inputStyling}
            label="E-mail"
            name="email"
            required
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
            value={formData.email}
            helperText={formErrors.email ? formErrors.email : null}
          />
          <TextField
            multiline={true}
            color={lightMode ? "darkHighlight4" : "darkHighlight3"}
            variant="standard"
            sx={inputStyling}
            label="Message"
            name="message"
            required
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, message: e.target.value };
              })
            }
            value={formData.message}
            helperText={formErrors.message ? formErrors.message : null}
          />

          <button
            className={styles.submit}
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </button>
        </form>
      </ThemeProvider>
    </div>,
    document.getElementById("contact-portal")
  );
}

export default Contact;
