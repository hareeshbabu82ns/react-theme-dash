import { createContext, useEffect, useState } from "react";
import {
  DEFAULT_M3_THEME_SCHEME,
  DEFAULT_M3_THEME_SCHEME_COLORS,
} from "themes/m3/M3Theme";
import { generateThemeSchemeFromColors } from "../utils";

// export interface ThemeSchemeContextType {
//     themeScheme: M3ThemeScheme,
//     generateThemeScheme: (base: string) => void,
//     resetThemeScheme: () => void
// };

export const ThemeSchemeContext = createContext({
  themeScheme: DEFAULT_M3_THEME_SCHEME,
  generateThemeScheme: async (base) => {},
  resetThemeScheme: () => {},
});

const THEME_SCHEME_KEY = "ThemeScheme";

const ThemeSchemeProvider = ({ children }) => {
  const [themeScheme, setThemeScheme] = useState(DEFAULT_M3_THEME_SCHEME);

  useEffect(() => {
    if (localStorage.getItem(THEME_SCHEME_KEY)) {
      const localThemeScheme = JSON.parse(
        localStorage.getItem(THEME_SCHEME_KEY) || "{}"
      );
      // setThemeScheme(localThemeScheme);
      generateThemeScheme(localThemeScheme.colorBase, {
        secondaryColor: localThemeScheme.secondaryColor,
        tertiaryColor: localThemeScheme.tertiaryColor,
      });
    }
  }, []);

  const generateThemeScheme = async (
    colorBase,
    { secondaryColor, tertiaryColor } = {}
  ) => {
    const scheme = generateThemeSchemeFromColors(colorBase, {
      secondaryColor,
      tertiaryColor,
    });
    setThemeScheme({
      light: scheme.light,
      dark: scheme.dark,
      tones: scheme.tones,
    });
    localStorage.setItem(
      THEME_SCHEME_KEY,
      JSON.stringify({
        colorBase: scheme.colorBase,
        secondaryColor: scheme.secondaryColor,
        tertiaryColor: scheme.tertiaryColor,
      })
    );
  };

  const resetThemeScheme = () => {
    setThemeScheme(DEFAULT_M3_THEME_SCHEME);
    localStorage.setItem(
      THEME_SCHEME_KEY,
      JSON.stringify(DEFAULT_M3_THEME_SCHEME_COLORS)
    );
  };

  return (
    <ThemeSchemeContext.Provider
      value={{ themeScheme, generateThemeScheme, resetThemeScheme }}
    >
      {children}
    </ThemeSchemeContext.Provider>
  );
};

export default ThemeSchemeProvider;
