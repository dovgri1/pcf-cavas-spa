import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as React from "react";

interface ChildProps {
  onBottomNavigationChange: (data: string) => void;
}

export const ApplicationBottomNavigation: React.FC<ChildProps> = ({
  onBottomNavigationChange,
}) => {
  const [inputValue, setInputValue] = React.useState<number>(0);

  const handleInputChange = (event: React.SyntheticEvent, newValue: number) => {
    setInputValue(newValue);
    onBottomNavigationChange(`Selected index is ${newValue}`);
  };
  return (
    <BottomNavigation
      style={{ zIndex: 1201 }}
      onChange={handleInputChange}
      value={inputValue}
    >
      <BottomNavigationAction key={1} label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction
        key={2}
        label="Favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        key={3}
        label="Nearby"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};
