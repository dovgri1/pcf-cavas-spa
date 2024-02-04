import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as React from "react";

interface ChildProps {
  onBottomNavigationChange: (data: string) => void;
}

export const ApplicationBottomNavigationCard: React.FC<ChildProps> = ({
  onBottomNavigationChange,
}) => {
  const [inputValue, setInputValue] = React.useState<number>(0);

  const handleInputChange =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setInputValue(index);
      onBottomNavigationChange(`Selected index is ${index}`);
    };
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        justifyItems: "end",
      }}
    >
      <Box sx={{ display: "flex", gap: 10, width: '25%' }}>
        <IconButton
          sx={{
            width:'25%'
          }}
          size="large"
          color={inputValue === 0 ? "primary" : "default"}
          onClick={handleInputChange(0)}
        >
          <RestoreIcon />
        </IconButton>
        <IconButton
          color={inputValue === 1 ? "primary" : "default"}
          onClick={handleInputChange(1)}
          sx={{
            width:'25%'
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          color={inputValue === 2 ? "primary" : "default"}
          onClick={handleInputChange(2)}
          sx={{
            width:'25%'
          }}
        >
          <LocationOnIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};
