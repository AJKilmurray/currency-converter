import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import SearchButton from "./SearchButton";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

function Form({ submitHandler }) {
	const classes = useStyles;
	return (
		<>
			<form className={classes.root} autoComplete="off" noValidate onSubmit={submitHandler}>
				<Input />
				<SearchButton />
			</form>
		</>
	);
}

export default Form;
