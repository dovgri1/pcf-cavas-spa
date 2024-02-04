import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { TableComponent } from "../tables/TableComponent";
import { FilePickerComponent } from "../controlers/FilePickerComponent";

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
            <TableComponent></TableComponent>
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
              mr: { md: 2, sm: 1, xs: 1 },
              ml: { md: 0, sm: 1, xs: 1 },
            }}
          >
            <FilePickerComponent/>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
