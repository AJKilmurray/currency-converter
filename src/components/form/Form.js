import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import SearchButton from "./SearchButton";
import FilterDropdown from "./FilterDropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Form({ submitHandler, results, filter }) {
  const classes = useStyles;
  return (
    <>
      <form className={classes.root} autoComplete="off" noValidate onSubmit={submitHandler}>
        <Input />
        <SearchButton />
        {filter > 0 ? <FilterDropdown results={results} /> : null}
      </form>
    </>
  );
}

export default Form;
