import { Box } from "@mui/material";
import Buttons from "components/m3/samples/Buttons";
import FloatingActionButtons from "components/m3/samples/Fabs";
import Cards from "components/m3/samples/Cards";
import Accordions from "components/m3/samples/Accordions";
import Snackbars from "components/m3/samples/Snackbars";
import Switchs from "components/m3/samples/Switchs";
import Inputs from "../samples/Inputs";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

const ComponentPage = () => {
  const boxSX = { mb: 8 };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Components" subtitle="Simple Components" />
      </FlexBetween>
      <Box sx={boxSX} />
      <Buttons />
      <Box sx={boxSX} />
      <Inputs />
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
