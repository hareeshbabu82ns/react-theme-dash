import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ColorSystem from "components/m3/ColorSystem";

import RootLayout from "components/m3/layout/RootLayout";
import ComponentPage from "components/m3/pages/Components";
import Home from "components/m3/pages/Home";

import ThemeModeProvider from "themes/m3/context/ThemeModeContext";
import ThemeSchemeProvider from "themes/m3/context/ThemeSchemeContext";
import M3ThemeProvider from "themes/m3/M3ThemeProvider";

const App = () => {
  return (
    <ThemeModeProvider>
      <ThemeSchemeProvider>
        <M3ThemeProvider>
          <AppContents />
        </M3ThemeProvider>
      </ThemeSchemeProvider>
    </ThemeModeProvider>
  );
};

const AppContents = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<ComponentPage />}></Route>
          <Route path="/theme" element={<ColorSystem />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
