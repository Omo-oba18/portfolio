import { createTheme } from '@mui/material/styles';
import { breakpoints } from './breakpoints';
import { typography } from './typography';
const theme = createTheme({
  typography,
  palette: {
    primary: {
      main: '#4F6F52',
    },
    secondary: {
      main: '#ECE3CE',
    },
  },
  breakpoints,
});

export default theme;
