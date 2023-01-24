import { createTheme } from "@mui/material";

import colors from "./vars.scss";

const theme = createTheme({
  palette: {
    darkMain: {
      main: colors.darkMain,
    },
    darkMain1: {
      main: colors.darkMain1,
    },
    darkMain2: {
      main: colors.darkMain2,
    },
    darkHighlight1: {
      main: colors.darkHighlight1,
    },
    darkHighlight2: {
      main: colors.darkHighlight2,
    },
    darkHighlight3: {
      main: colors.darkHighlight3,
    },
    darkHighlight4: {
      main: colors.darkHighlight4,
    },

    action: {
      disabled: "hsla(115, 100%, 95%)",
    },
  },

  typography: {
    fontFamily: `"Poiret One", cursive`,
  },
});
export default theme;
