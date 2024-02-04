import { Box, Button } from "@mui/material";
import * as React from "react";
import { _context } from "../../services/DataService";
import { _selectedRecord } from "../../services/DataService";

export const FormNavigationComponent: React.FC = () => {
  const entityId = _selectedRecord.id; // The GUID of the record
  const entityName = _selectedRecord.entityName;

  const parameters = {};
  const options = {
    entityName: entityName,
    entityId: entityId,
  };

  const handleOpenForm = () => {
    _context.navigation.openForm(options, parameters).then(
        (success) => {
            console.log("Form opened successfully", success);
        }
    );
  };

  return (
    <Box>
      <Button onClick={handleOpenForm}>Upload File</Button>
    </Box>
  );
};
