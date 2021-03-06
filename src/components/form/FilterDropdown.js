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

function FilterDropdown({ handlers }) {
	const classes = useStyles();
	const [filter, setFilter] = useState("");
	const handleChange = (event) => {
		setFilter(event.target.value);
	};

	return (
		<FormControl className={classes.formControl} id="filter">
			<InputLabel id="demo-simple-select-label">Sort</InputLabel>
			<Select labelId="demo-simple-select-label" id="demo-simple-select" value={filter} onChange={handleChange}>
				<MenuItem value={1} onClick={handlers[0]}>
					Low to High
				</MenuItem>
				<MenuItem value={2} onClick={handlers[1]}>
					High to Low
				</MenuItem>
				<MenuItem value={3} onClick={handlers[2]}>
					A - Z
				</MenuItem>
				<MenuItem value={4} onClick={handlers[3]}>
					Z - A
				</MenuItem>
			</Select>
		</FormControl>
	);
}

export default FilterDropdown;
