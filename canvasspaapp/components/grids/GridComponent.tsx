import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { MainTableComponent } from "../tables/MainTableComponent";
import { FilePickerComponent } from "../controlers/FilePickerComponent";
import { SideTimelineComponent } from "../tables/SideTimelineComponent";


export const GridComponent: React.FC = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", display: "flex" }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              height: "95%",
              width: "100%",
              display: "flex",
              mr: { md: 0, sm: 1, xs: 1 },
              ml: { md: 2, sm: 1, xs: 1 },
            }}
          >
            <MainTableComponent></MainTableComponent>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={10}
            sx={{
              height: "95%",
              width: "100%",
              display: "flex",
              justifyItems:'center',
              mr: { md: 2, sm: 1, xs: 1 },
              ml: { md: 0, sm: 1, xs: 1 },
            }}
          >
              <SideTimelineComponent />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
