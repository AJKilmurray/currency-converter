import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import SearchButton from "./SearchButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  table: {
    minWidth: 650,
  },
}));

function Form() {
  const classes = useStyles;
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Search Field
    const inputField = document.getElementById("input");

    if (!inputField.value) {
      // InputField value is empty
      emptySearch(inputField);
    } else if (inputField.value) {
      // InputField value is not empty (valid)
      validSearch(inputField);
    }
  };

  const emptySearch = (input) => {
    console.log("test");
  };

  const validSearch = async (input) => {
    const value = input.value.toLowerCase();
    const fetchResult = await fetchSearchData(input, value);

    if (fetchResult.invalidSearch) {
      searchNotFound(input);
      return;
    }

    const amount = document.getElementById("amount");
    let resultOutput = [];
    for (const [key, value] of Object.entries(fetchResult)) {
      if (key === value) {
        return;
      }

      resultOutput.push({ key, value: value * amount.value });
    }
    setResults(resultOutput);
  };

  const searchNotFound = (input) => {
    console.log("hello");
  };

  const fetchSearchData = async (input, keyword) => {
    return await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${keyword}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Status Code: ${res.status}`);
        }

        return res.json();
      })
      .then((res) => {
        return res[keyword];
      })
      .catch((err) => {
        console.log(err);
        return {
          invalidSearch: true,
        };
      });
  };

  return (
    <>
      <form className={classes.root} autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Input />
        <SearchButton />
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Currency Conversion Table">
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
                <TableCell align="right">{result.value.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Form;
