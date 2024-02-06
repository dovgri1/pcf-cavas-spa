import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { MainTableComponent } from "../tables/MainTableComponent";
import { SideTimelineComponent } from "../tables/SideTimelineComponent";
import {useSelectedRecord} from "../../components/store/useSelectedRecord"
import { useOpenDialog } from "../store/useOpenDialog";

export const GridComponent: React.FC = () => {
  const selectedRecord = useSelectedRecord().user
  const setOpenDialog = useOpenDialog((state) => state.setOpen);
  const handleDialog = () => {
    setOpenDialog(true)
  }

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
              flexDirection: "column",
              justifyItems: "center",
              mr: { md: 2, sm: 1, xs: 1 },
              ml: { md: 0, sm: 1, xs: 1 },
            }}
          >
            <Box sx={{ height: "10%", display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{justifyContent: 'center', display: 'flex'}} variant="h5">
                {"Record Events " + selectedRecord['fullname']}
              </Typography>
            </Box>
            <Box sx={{ height: "80%" }}>
              <SideTimelineComponent />
            </Box>
            <Box sx={{ height: "10%", display: 'flex', flexDirection: 'row', justifyItems: 'center', justifyContent: 'center' }}>
              <Button color="primary" variant="contained" onClick={handleDialog}>Create New Event</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
