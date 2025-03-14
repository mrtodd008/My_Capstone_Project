// admin-frontend/src/Context/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D5A80", // Cobalt Blue
    },
    secondary: {
      main: "#FFFFFF", // White
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333", // Dark gray for text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3D5A80",
          color: "#FFFFFF",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#3D5A80",
          color: "#FFFFFF",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#FFFFFF",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
