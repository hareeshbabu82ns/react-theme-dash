import {
  argbFromHex,
  hexFromArgb,
  CorePalette,
  Scheme,
  customColor,
} from "@material/material-color-utilities";

export const generateThemeSchemeFromColors = (
  colorBase,
  { secondaryColor, tertiaryColor } = {}
) => {
  // const theme = themeFromSourceColor(argbFromHex(colorBase));
  const theme = themeFromColors(colorBase, { secondaryColor, tertiaryColor });

  /*let theme = undefined;
      if (typeof colorBase == 'string') {
          theme = themeFromSourceColor(argbFromHex(colorBase));
      }
      else {
          theme = await themeFromImage(colorBase);
      }*/

  const paletteTones = {};
  const paletteExtras = {};
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

  const lightJSON = theme.schemes.light.toJSON();
  const darkJSON = theme.schemes.dark.toJSON();

  // for (const [key, palette] of Object.entries(theme.palettes)) {
  //   console.log(palette);
  // }

  for (const [key, value] of Object.entries(lightJSON)) {
    const color = hexFromArgb(value);
    light[key] = color;
    // console.log(key, color);
  }
  for (const [key, value] of Object.entries(darkJSON)) {
    const color = hexFromArgb(value);
    dark[key] = color;
  }
  const scheme = {
    //: M3ThemeScheme
    light,
    dark,
    tones: paletteTones,
    extras: paletteExtras,
    colorBase,
    secondaryColor,
    tertiaryColor,
  };
  return scheme;
};

export function themeFromColors(
  colorBase,
  { secondaryColor, tertiaryColor, customColors } = {}
) {
  const source = argbFromHex(colorBase);
  const palette = secondaryColor
    ? CorePalette.contentFromColors({
        primary: source,
        secondary: argbFromHex(secondaryColor),
        tertiary: argbFromHex(tertiaryColor),
      })
    : CorePalette.of(source);

  return {
    source: {
      colorBase,
      secondaryColor,
      tertiaryColor,
    },
    schemes: {
      light: Scheme.lightFromCorePalette(palette),
      dark: Scheme.darkFromCorePalette(palette),
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error,
    },
    customColors: customColors
      ? customColors.map((c) => customColor(source, c))
      : [],
  };
}
