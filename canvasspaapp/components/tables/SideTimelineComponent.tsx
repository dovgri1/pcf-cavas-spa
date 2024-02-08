import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box } from "@mui/material";
import * as React from "react";
import { getSelectedChildRecords } from "../../services/DataService";
import { useSelectedRecord } from "../store/useSelectedRecord";
import { useOpenDialog } from "../store/useOpenDialog";
import { Entity } from "../../interfaces/interfaces";

export const SideTimelineComponent: React.FC = () => {
  const selectedRecord = useSelectedRecord((state) => state.user);
  const dialogStatus = useOpenDialog((state) => state.open);
  const [timelineItems, setTimelineItems] =
    React.useState<Entity[]>();


  React.useEffect(() => {
    const fetchData = async () => {
      if (selectedRecord?.id !== undefined && dialogStatus === false) {
        try {
          const childRecords = await getSelectedChildRecords(selectedRecord?.id);
          setTimelineItems(childRecords);
        } catch (error) {
          console.error("Failed to fetch child records:", error);
          // Handle the error as needed
        }
      }
    };
  
    fetchData();
  }, [selectedRecord, dialogStatus]);



  const demoTimelineItems = {
    entities: [
        {"new_name" : "Wake up", "new_eventdate": "2023-01-01"}, 
        {"new_name" : "Get Breakfast", "new_eventdate": "2023-01-02"}, 
        {"new_name" : "Code a bit", "new_eventdate": "2023-01-03"}, 
        {"new_name" : "Go to sleep", "new_eventdate": "2023-01-04"}, 
    ]
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Timeline
        position="alternate"
        sx={{
          width:"100%",
          height:'100%',
          overflowY: "auto", // Corrected property for vertical scrolling
          display: "flex",
          flexDirection: "column", // Ensures items are laid out vertically
          flexWrap: "nowrap", // Prevents wrapping of items
          justifyContent: "flex-start", // Aligns items to the start of the flex container
          
        }}
      >
        {timelineItems?.map((item, index, array) => (
          <TimelineItem key={item.new_contacteventid}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index !== array.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{item["new_name"] + " " + item["new_eventdate"] }</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
