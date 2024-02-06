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

export const SideTimelineComponent: React.FC = () => {
  const selectedRecord = useSelectedRecord((state) => state.user);
  const dialogStatus = useOpenDialog((state) => state.open);
  const [timelineItems, setTimelineItems] =
    React.useState<ComponentFramework.WebApi.RetrieveMultipleResponse>();

  React.useEffect(() => {
    if (selectedRecord?.id != undefined && dialogStatus == false) {
      getSelectedChildRecords(selectedRecord?.id).then((childRecords) => {
        setTimelineItems(childRecords);
      });
    }
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
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Timeline
        position="alternate"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {timelineItems?.entities.map((item, index, array) => (
          <TimelineItem key={item.new_name}>
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
