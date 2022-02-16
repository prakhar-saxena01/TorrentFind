import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Search from "./components/Serach";
function App() {
  const [isDark] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Search />
    </ThemeProvider>
  );
}

export default App;
