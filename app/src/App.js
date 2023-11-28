import theme from "./core/theme/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
