import { useScrollTrigger } from "@mui/material";
import { cloneElement, FC } from "react";

const ElevationToolbar = ({ children, window }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    //color: trigger ? 'primary' : 'default'
  });
};

export default ElevationToolbar;
