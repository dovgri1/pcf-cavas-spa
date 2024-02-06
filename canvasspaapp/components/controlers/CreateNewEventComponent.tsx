import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useOpenDialog } from "../store/useOpenDialog";
import { createNewEvent, getSelectedChildRecords } from "../../services/DataService";
import { useSelectedRecord } from "../store/useSelectedRecord";

export const NewEventDialogComponent: React.FC = () => {
    const selectedRecord = useSelectedRecord((state) => state.user);
  const openDialog = useOpenDialog((state) => state.open);
  const setDialog = useOpenDialog((state) => state.setOpen);

  const handleClose = () => {
    setDialog(false);
  };

  const handleSubmit = async  (event: any) => {
    event.preventDefault();
    let result;
    const formData = new FormData(event.currentTarget);
    const eventName = formData.get("eventName"); 
    const eventDate = formData.get("eventDate");
    if(eventName !== null && eventDate !== null){
        result = await createNewEvent(eventName?.toString(), eventDate.toString(), selectedRecord.id );
        getSelectedChildRecords(selectedRecord.id );
    }
    
    handleClose(); 
  };

  return (
    <Box sx={{ position: "fixed", display: "flex", justifyContent: "center" }}>
      <Dialog
        open={openDialog}
        onClose={handleClose} // This will allow the dialog to close when clicking outside
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create new Event</DialogTitle>
          <DialogContent sx={{gap:2}}>
            <TextField
              required={true}
              autoFocus
              margin="dense"
              id="eventName"
              label="Event Name"
              type="text"
              fullWidth
              variant="outlined"
              name="eventName" // Name attribute for FormData
            />
            <TextField
              required={true}
              margin="dense"
              id="eventDate"
              label="Event Date"
              type="datetime-local"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              name="eventDate" // Name attribute for FormData
            />
          </DialogContent>
          <DialogActions sx={{display:'flex', mr: 2, ml: 2, mb: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
