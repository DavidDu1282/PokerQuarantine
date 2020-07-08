import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface ManagementProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function Management(props: ManagementProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

function handleListItemClick(ReportID) {
  alert('Viewing ReportID: '+ ReportID)
}

const rows = [
  {name : 'Sample UserName 1', case_description: 'Sample Report Detail filled by user 1', time: '3:07', ReportID: 1000.0},
  {name : 'Sample UserName 2', case_description: 'Sample Report Detail filled by user 2', time:  '3:07', ReportID: 1001.0},
  {name : 'Sample UserName 3', case_description: 'Sample Report Detail filled by user 3', time: '3:07', ReportID: 1002.0},
  {name : 'Sample UserName 4', case_description: 'Sample Report Detail filled by user 4', time: '3:07', ReportID: 1003.0},
  {name : 'Sample UserName 5', case_description: 'Sample Report Detail filled by user 5', time: '3:07', ReportID: 1004.0},
  {name : 'Sample UserName 6', case_description: 'Sample Report Detail filled by user 6', time: '3:07', ReportID: 1005.0},
  {name : 'Sample UserName 7', case_description: 'Sample Report Detail filled by user 7', time: '3:07', ReportID: 1006.0},
  {name : 'Sample UserName 8', case_description: 'Sample Report Detail filled by user 8', time: '3:07', ReportID: 1007.0},
  {name : 'Sample UserName 9', case_description: 'Sample Report Detail filled by user 9', time: '3:07', ReportID: 1008.0},
  {name : 'Sample UserName 10', case_description: 'Sample Report Detail filled by user 10', time: '3:07', ReportID: 1009.0},
  {name : 'Sample UserName 11', case_description: 'Sample Report Detail filled by user 11', time: '3:07', ReportID: 1010.0},
  {name : 'Sample UserName 12', case_description: 'Sample Report Detail filled by user 12', time: '3:07', ReportID: 1011.0},
  {name : 'Sample UserName 13', case_description: 'Sample Report Detail filled by user 13', time: '3:07', ReportID: 1012.0},
  {name : 'Sample UserName 14', case_description: 'Sample Report Detail filled by user 14', time: '3:07', ReportID: 1013.0},
  {name : 'Sample UserName 15', case_description: 'Sample Report Detail filled by user 15', time: '3:07', ReportID: 1014.0},
  {name : 'Sample UserName 16', case_description: 'Sample Report Detail filled by user 16', time: '3:07', ReportID: 1015.0},
];

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationManagement() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{ width: 180 }} align="right">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.case_description}
              </TableCell>
              <TableCell style={{ width: 60 }} align="right">
                {row.time}
              </TableCell>
              <TableCell><Button size="large" variant="outlined" color="Primary"class="editbtn" onClick={(event) => handleListItemClick(row.ReportID)}>More Details </Button></TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={Management}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
