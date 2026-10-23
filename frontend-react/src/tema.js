import { createTheme } from "@mui/material/styles";

const tema = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#1976D2",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#9C27B0",
          contrastText: "#FFFFFF",
        },
        background: {
          default: "#FAFAFA",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#212121",
          secondary: "#616161",
        },
        divider: "#E0E0E0",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#90CAF9",
          contrastText: "#000000",
        },
        secondary: {
          main: "#CE93D8",
          contrastText: "#000000",
        },
        background: {
          default: "#121212",
          paper: "#1E1E1E",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
        },
        divider: "#333333",
      },
    },
  },
});

export default tema;