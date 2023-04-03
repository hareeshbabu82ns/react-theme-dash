import { createContext, useEffect, useState } from "react";
import { DEFAULT_M3_THEME_SCHEME } from "themes/m3/M3Theme";
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";

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
      setThemeScheme(localThemeScheme);
    }
  }, []);

  const generateThemeScheme = async (colorBase) => {
    const theme = themeFromSourceColor(argbFromHex(colorBase));

    /*let theme = undefined;
        if (typeof colorBase == 'string') {
            theme = themeFromSourceColor(argbFromHex(colorBase));
        }
        else {
            theme = await themeFromImage(colorBase);
        }*/

    const paletteTones = {};
    const light = {};
    const dark = {};

    for (const [key, palette] of Object.entries(theme.palettes)) {
      const tones = {};
      for (const tone of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]) {
        const color = hexFromArgb(palette.tone(tone));
        tones[tone] = color;
      }
      paletteTones[key] = tones;
    }

    for (const [key, value] of Object.entries(theme.schemes.light.toJSON())) {
      const color = hexFromArgb(value);
      light[key] = color;
    }
    for (const [key, value] of Object.entries(theme.schemes.dark.toJSON())) {
      const color = hexFromArgb(value);
      dark[key] = color;
    }
    const scheme = {
      //: M3ThemeScheme
      light,
      dark,
      tones: paletteTones,
    };
    setThemeScheme(scheme);
    localStorage.setItem(THEME_SCHEME_KEY, JSON.stringify(scheme));
  };

  const resetThemeScheme = () => {
    setThemeScheme(DEFAULT_M3_THEME_SCHEME);
    localStorage.setItem(
      THEME_SCHEME_KEY,
      JSON.stringify(DEFAULT_M3_THEME_SCHEME)
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
