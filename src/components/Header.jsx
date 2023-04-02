import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function Header({ title, subtitle }) {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.text.onDefaultSecondary}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.text.onDefaultTertiary}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
