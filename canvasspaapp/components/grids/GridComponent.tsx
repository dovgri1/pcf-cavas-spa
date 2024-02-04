import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { TableComponent } from "../tables/TableComponent";

export const GridComponent: React.FC = () => {
  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Grid container spacing={2} sx={{justifyContent: "center", display: "flex"}}>
        <Grid item xs={12} md={8} sx={{display: "flex", justifyContent: "center" }} >
          <Box sx={{height: "90%", width: "100%", display: "flex", ml: {sm: 2}}}>
            <TableComponent></TableComponent>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={10}
            sx={{
              height: "90%",
              width: "100%",
              display: 'flex',
              mr: {sm: 2}
            }}
          >
            <Typography>Selected Record Information Goes Here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
