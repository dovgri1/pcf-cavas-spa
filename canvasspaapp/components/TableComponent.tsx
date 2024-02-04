import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TableFooter, TablePagination } from '@mui/material';
import { _context } from '../services/DataService';
import { Column, IsIndex, RecordItem } from '../interfaces/interfaces';



export const TableComponent : React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {setPage(newPage)};
    const [items, setItems] = React.useState<RecordItem[]>([]);
    const [columns, setColumns] = React.useState<Column[]>([]);
    const dataSet : ComponentFramework.PropertyTypes.DataSet = _context.parameters.sampleDataSet;

    React.useEffect(() => {
      const newColumns: Column[] = dataSet.columns.map(
        (column: any) => ({
            key: column.name,
            name: column.alias,
            fieldName: column.displayName,
            minWidth: column.visualSizeFactor,
            maxWidth: column.visualSizeFactor,
            isResizable: true,
            isIndex: column,
        })
    )
    setColumns(newColumns)

    const newItems : RecordItem[] = dataSet.sortedRecordIds.map(
      (recordId: any) => {
          const record = dataSet.records[recordId]
          const item: RecordItem = { id: recordId }
          newColumns.forEach((column) => {
              item[column.name] = record.getValue(column.key)
          })
          return item
      }
    )
    setItems(newItems);

    },[_context.parameters.sampleDataSet]);

    function RenderCells(props: { columns: Column[]; row: RecordItem }){
  return (
    <React.Fragment>
        {props.columns.map((column) => {
            if (column.isIndex.dataType.includes('SingleLine')) {
                return (
                    <TableCell key={column.name}>
                        {props.row[column.name]}
                    </TableCell>
                )
            } else if (column.isIndex.dataType === 'Lookup.Simple') {
                return (
                    <TableCell key={column.name}>
                        {props.row[column.name]?.name}
                    </TableCell>
                )
            } else if (column.isIndex.dataType.includes('OptionSet')) {
                return <TableCell key={column.name}>{props.row[column.name]}</TableCell>
            } else {
                return <TableCell key={column.name}>{props.row[column.name]}</TableCell>
            }
        })}
    </React.Fragment>
  )
    }

  return (
    <React.Fragment>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', gap:2}}>
      <TableContainer elevation={10} component={Paper} sx={{ width:'100%',  height: '100%'}}>
            <Table sx={{width:'100%' }} size='small' aria-label="simple table">
                <TableHead>
                <TableRow>
                  {
                    columns.map((column) => (
                      <TableCell key={column.name}>
                          {column.fieldName}
                      </TableCell>
                    ))
                  }
                </TableRow>
                </TableHead>
                <TableBody>
                {(rowsPerPage > 0 
                   ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                   : items ).map((item) => (
                        <TableRow
                          hover
                          onClick= {(event) => console.log(event)}
                          key={item.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:'pointer' }}
                          >
                          <RenderCells columns={columns} row={item}></RenderCells>
                        </TableRow>
                ))}
                </TableBody>
                
            </Table>   
        </TableContainer>
        <Paper elevation={10} sx={{display:'flex', justifyContent:'center', justifyItems:'center', width: '100%', height:'12%'}}>
          <TablePagination
              component="div"
              count={items.length}
              rowsPerPage={10}
              page={page}
              onPageChange={handleChangePage}
            />
        </Paper>
      </Box>

        
    </React.Fragment>
   
  );
}