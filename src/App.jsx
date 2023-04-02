import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import reactLogo from "assets/react.svg";
import { useSelector } from "react-redux";
import customTheme from "themes";
import ProtectedLayout from "scenes/layout";
import ThemePage from "scenes/theme/ThemePage";
import LoginPage from "scenes/user/Login";
import SignupPage from "scenes/user/Signup";

function App() {
  const themeState = useSelector((state) => state.theme);
  const theme = useMemo(
    () =>
      customTheme({
        mode: themeState.mode,
        baseColor: themeState.baseColor,
        secondaryColor: themeState.secondaryColor,
        tertiaryColor: themeState.tertiaryColor,
        fontFamily: "Inter, sans-serif",
      }),
    [themeState]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Routes>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<AppContents />} />
              <Route path="/theme" element={<ThemePage />} />
            </Route>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const AppContents = () => {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Stack
        gap={2}
        sx={{ height: "90vh", pt: "auto" }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          gap={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </Stack>
        <Typography variant="h1">React App</Typography>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <Box maxWidth="250px">
            <Button
              variant="outlined"
              size="large"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </Button>
          </Box>
          <Typography variant="h4">
            Edit <code>src/App.jsx</code> and save to test HMR
          </Typography>
        </Stack>
        <Typography variant="h5">
          Click on the React logo to learn more
        </Typography>
      </Stack>
    </Container>
  );
};

export default App;
