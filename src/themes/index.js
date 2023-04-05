import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

// assets
// import cssCustomColors from "assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./dynamic-palette";
import { getDesignTokens, getThemedComponents } from "./m3";
import { generateThemeSchemeFromColors } from "./m3/utils";
import materialDynamicColors from "./material-dynamic-colors";
import themeTypography from "./typography";
import { reverseTokens } from "./utils";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const isDark = customization.mode === "dark";

  const baseColor = customization.baseColor || "#130019";

  if (customization.isMui) {
    const themeScheme = generateThemeSchemeFromColors(baseColor, {
      secondaryColor: customization.secondaryColor,
      tertiaryColor: customization.tertiaryColor,
    });

    const finalTones = !isDark
      ? themeScheme.tones
      : reverseTokens(themeScheme.tones);

    const designTokens = getDesignTokens({
      mode: customization.mode,
      scheme: themeScheme[customization.mode],
      tones: finalTones,
    });

    let newM3Theme = createTheme(designTokens);
    newM3Theme = deepmerge(newM3Theme, getThemedComponents(newM3Theme));

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeScheme[customization.mode].surface);

    // console.log(newM3Theme);
    return newM3Theme;
  }
  // if not MUI
  const colors = materialDynamicColors({
    seed: baseColor,
    isDark,
    overrides: {
      light: {
        primary: customization.baseColor,
        secondary: customization.secondaryColor,
        tertiary: customization.tertiaryColor,
      },
      dark: {
        primary: customization.baseColor,
        secondary: customization.secondaryColor,
        tertiary: customization.tertiaryColor,
      },
    },
  });
  // console.log(colors.primary);
  // console.log(colors.secondary);
  // console.log(colors.tertiary);
  const themeOption = {
    colors,
    customization,
  };

  // console.log(themeOption);

  const palette = themePalette(themeOption);

  // console.log(palette);

  const themeOptions = {
    direction: "ltr",
    palette,
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption, palette),
  };

  const themes = createTheme(themeOptions);

  themes.components = componentStyleOverrides(themeOption, palette);

  return themes;
};

export default theme;
