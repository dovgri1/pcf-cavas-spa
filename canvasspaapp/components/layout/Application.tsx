import { Box } from "@mui/material";
import * as React from "react";
import { ApplicationTopBar } from "./ApplicationTopBar";
import { Theme } from "../style/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { GridComponent } from "../grids/GridComponent";
import {ApplicationBottomNavigationCard} from './ApplicationBottomNavigationCard'
import {NewEventDialogComponent} from '../controlers/CreateNewEventComponent'

export const Application: React.FC = () => {
  const [childData, setChildData] = React.useState("");

  const handleBottomNavigationChange = (data: string) => {
    setChildData(data);
  };

  const ComponentToReturn = () => {
    if (childData == "Selected index is 1") {
      return <GridComponent></GridComponent>;
    } else {
      return <GridComponent></GridComponent>;
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "95vh",
          width: "100%",
          justifyContent: "space-between",
          
        }}
      >
        <Box
          sx={{
            justifyContent: "start",
            height: "10%",
          }}
        >
          <ApplicationTopBar />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            height: "82%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ComponentToReturn></ComponentToReturn>
          <NewEventDialogComponent></NewEventDialogComponent>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "8%",
            justifyItems: 'end',
            justifyContent:'center',
            display:'flex'
          }}
        >
          <ApplicationBottomNavigationCard
            onBottomNavigationChange={handleBottomNavigationChange}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
