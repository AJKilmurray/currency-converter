import TextField from "@material-ui/core/TextField";

function Input() {
	return (
		<>
			<TextField id="input" label="Currency" required />
			<TextField id="amount" label="Amount" type="number" />
		</>
	);
}

export default Input;
