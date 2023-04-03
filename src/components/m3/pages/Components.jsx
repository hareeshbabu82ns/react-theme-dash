import { Box } from "@mui/material";
import Buttons from "components/m3/samples/Buttons";
import FloatingActionButtons from "components/m3/samples/Fabs";
import Cards from "components/m3/samples/Cards";
import Accordions from "components/m3/samples/Accordions";
import Snackbars from "components/m3/samples/Snackbars";
import Switchs from "components/m3/samples/Switchs";

const ComponentPage = () => {
  const boxSX = { mb: 8 };
  return (
    <Box
      sx={{
        maxWidth: 936,
        margin: "auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Buttons />
      <Box sx={boxSX} />
      <Switchs />
      <Box sx={boxSX} />
      <FloatingActionButtons />
      <Box sx={boxSX} />
      <Cards />
      <Box sx={boxSX} />
      <Accordions />
      <Box sx={boxSX} />
      <Snackbars />
    </Box>
  );
};

export default ComponentPage;
