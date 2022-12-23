import { Poppins } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E6AB09',
      light: '#FFCB3B',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});

export default theme;