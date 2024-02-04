import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { TableComponent } from "./TableComponent";

export const GridComponent: React.FC = () => {
  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Box sx={{ ml: 2, height: "90%", width: "98%", display: "flex" }}>
            <TableComponent></TableComponent>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper
            elevation={10}
            sx={{
              height: "90%",
              width: "98%",
              mr: 2,
            }}
          >
            <Typography>Selected Record Information Goes Here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
