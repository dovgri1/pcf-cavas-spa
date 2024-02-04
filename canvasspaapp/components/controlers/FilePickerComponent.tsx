import { Box, Button } from "@mui/material";
import * as React from "react";
import { _context } from "../../services/DataService";

export const FilePickerComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] =
    React.useState<ComponentFramework.FileObject[]>();

  const handlePickFile = () => {
    const fileOptions = {
        accept: "image", 
        allowMultipleFiles: true,
        maximumAllowedFileSize: 900000
        
        }
    try {
        _context.device
        .pickFile(fileOptions)
        .then((file: ComponentFramework.FileObject[]) => {
          console.log(file);
        });
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <Box>
      <Button onClick={handlePickFile}>Upload File</Button>
    </Box>
  );
};
