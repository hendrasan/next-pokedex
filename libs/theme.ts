import { Poppins } from "@next/font/google";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    gray: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E6AB09",
      light: "#FFCB3B",
    },
    error: {
      main: red.A400,
    },
    neutral: {
      main: "#42494D",
    },
    gray: {
      main: "#7B8082",
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          color: themeParam.palette.neutral.main,
        },
      }),
    },
  },
});

export default theme;
