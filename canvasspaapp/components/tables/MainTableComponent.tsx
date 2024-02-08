import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TablePagination,
  Typography,
} from "@mui/material";
import { _context } from "../../services/DataService";
import { Column, RecordItem } from "../../interfaces/interfaces";
import { useSelectedRecord } from "../store/useSelectedRecord";
import { SideTimelineComponent } from "./SideTimelineComponent";
import { Theme } from "../style/Theme";
import { useMediaQuery } from "@mui/material";
import { useOpenDialog } from "../store/useOpenDialog";
import { usePageNumber, useRowsPerPage } from "../store/usePagingOptions";

export const MainTableComponent: React.FC = () => {
  const matchesMD = useMediaQuery(Theme.breakpoints.up("md"));
  const setSelectedRecord = useSelectedRecord((state) => state.setUser);
  const selectedRecord = useSelectedRecord((state) => state.user);
  const page = usePageNumber((state) => state.page);
  const setPage = usePageNumber((state) => state.setPage);
  const rowsPerPage = useRowsPerPage((state) => state.rowsCount);
  const setRowsPerPage = useRowsPerPage((state) => state.setRowsCount);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value))
  }
  const [items, setItems] = React.useState<RecordItem[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([]);
  const dataSet: ComponentFramework.PropertyTypes.DataSet =
    _context.parameters.sampleDataSet;
  const [openEventsDialog, SetOpenEventsDialog] =
    React.useState<boolean>(false);
  const setOpenDialog = useOpenDialog((state) => state.setOpen);

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    item: RecordItem
  ) => {
    setSelectedRecord(item);
    if (!matchesMD) {
      SetOpenEventsDialog(true);
    }
  };

  const handleDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    SetOpenEventsDialog(false);
  };

  const refreshDataset = () => {
    _context.parameters.sampleDataSet.refresh();
  };

  React.useEffect(() => {
    const newColumns: Column[] = dataSet.columns.map((column: any) => ({
      key: column.name,
      name: column.alias,
      fieldName: column.displayName,
      minWidth: column.visualSizeFactor,
      maxWidth: column.visualSizeFactor,
      isResizable: true,
      isIndex: column,
    }));
    setColumns(newColumns);

    const newItems: RecordItem[] = dataSet.sortedRecordIds.map(
      (recordId: any) => {
        const record = dataSet.records[recordId];
        const item: RecordItem = { id: recordId };
        newColumns.forEach((column) => {
          item[column.name] = record.getValue(column.key);
        });
        return item;
      }
    );
    setItems(newItems);
  }, [_context.parameters.sampleDataSet]);

  function RenderCells(props: { columns: Column[]; row: RecordItem }) {
    return (
      <React.Fragment>
        {props.columns.map((column) => {
          if (column.isIndex.dataType.includes("SingleLine")) {
            return (
              <TableCell key={column.name}>{props.row[column.name]}</TableCell>
            );
          } else if (column.isIndex.dataType === "Lookup.Simple") {
            return (
              <TableCell key={column.name}>
                {props.row[column.name]?.name}
              </TableCell>
            );
          } else if (column.isIndex.dataType.includes("OptionSet")) {
            return (
              <TableCell key={column.name}>{props.row[column.name]}</TableCell>
            );
          } else {
            return (
              <TableCell key={column.name}>{props.row[column.name]}</TableCell>
            );
          }
        })}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          gap: 2,
        }}
      >
        <Dialog
          open={openEventsDialog}
          onClose={handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              height: "10%",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              justifyContent: "center",
              overFlowY: "auto",
              mt: 2,
            }}
          >
            <Typography
              sx={{ justifyContent: "center", justifyItems: "center", display: "flex" }}
              variant="h5"
            >
              {"Record Events " + selectedRecord["fullname"]}
            </Typography>
          </Box>
          <Box sx={{ height: { xs: "65%", md: "80%" } }}>
            <SideTimelineComponent />
          </Box>
          <Box
            sx={{
              height: { xs: "25%", md: "10%" },
              mb: 1,
              display: "flex",
              flexDirection: "column",
              justifyItems: "end",
              justifyContent: "end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{ position: "relative" }}
                color="primary"
                variant="contained"
                onClick={handleDialog}
              >
                Create New Event
              </Button>
            </Box>
          </Box>
        </Dialog>
        <TableContainer
          elevation={10}
          component={Paper}
          sx={{ height: "100%" }}
        >
          <Table sx={{ width: "100%" }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.name}>{column.fieldName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? items.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : items
              ).map((item) => (
                <TableRow
                  hover
                  onClick={(event) => handleRowClick(event, item)}
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <RenderCells columns={columns} row={item}></RenderCells>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "15%",
          }}
        >
          <TablePagination
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifyItems: "center",
            }}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
          <Box sx={{display:"flex", flexDirection:'column', justifyContent:"center", justifyItems:'center'}}>
            <IconButton
              color={"default"}
              onClick={refreshDataset}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};
