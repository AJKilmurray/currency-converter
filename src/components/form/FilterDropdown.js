import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "grid",
    minWidth: 120,
  },
}));

function FilterDropdown({ results }) {
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const lowToHigh = () => {
    results.sort((a, b) => a.value - b.value);
  };

  const highToLow = () => {
    results.sort((a, b) => b.value - a.value);
  };

  const aToZ = () => {
    results.sort((a, b) => a.key.localeCompare(b.key));
  };

  const zToA = () => {
    results.sort((a, b) => b.key.localeCompare(a.key));
  };

  return (
    <FormControl className={(classes.formControl, "filter")}>
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filter} onChange={handleChange}>
        <MenuItem value={1} onClick={lowToHigh}>
          Low to High
        </MenuItem>
        <MenuItem value={2} onClick={highToLow}>
          High to Low
        </MenuItem>
        <MenuItem value={3} onClick={aToZ}>
          A - Z
        </MenuItem>
        <MenuItem value={4} onClick={zToA}>
          Z - A
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterDropdown;
