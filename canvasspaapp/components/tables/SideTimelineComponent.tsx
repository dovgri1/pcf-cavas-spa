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

export const SideTimelineComponent: React.FC = () => {
  const selectedRecord = useSelectedRecord((state) => state.user);
  const [timelineItems, setTimelineItems] =
    React.useState<ComponentFramework.WebApi.RetrieveMultipleResponse>();

  React.useEffect(() => {
    getSelectedChildRecords(selectedRecord?.id).then((childRecords) => {
      setTimelineItems(childRecords);
    });
  }, [selectedRecord]);

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
        {timelineItems?.entities.map((item) => (
          <TimelineItem key={item.new_name}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{item["new_name"]}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
