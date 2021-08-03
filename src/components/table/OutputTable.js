import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles(() => ({
  table: {
    table: {
      minWidth: 650,
    },
  },
}));

function OutputTable({ results, currency, amount }) {
  const classes = useStyles;

  return (
    <TableContainer component={Paper} id="table-container">
      <Table className={classes.table} id="table" aria-label="Currency Conversion Table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Conversion Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.key}>
              <TableCell component="th" scope="row">
                {result.key.toUpperCase()}
              </TableCell>
              <TableCell align="right" className="conversion">
                {amount.value > 0 ? amount.value : 1} {currency.value.toUpperCase()} <ArrowForwardIcon color="error" />{" "}
                {result.value.toFixed(2)} {result.key.toUpperCase()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OutputTable;
