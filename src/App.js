import Form from "./components/form/Form";
import OutputTable from "./components/table/OutputTable";
import { useState } from "react";
import Container from "@material-ui/core/Container";

function App() {
	const [results, setResults] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Search Field
		const inputField = document.getElementById("input");

		if (!inputField.value) {
			// InputField value is empty
			invalidSearch(inputField);
		} else if (inputField.value) {
			// InputField value is not empty (valid)
			validSearch(inputField);
		}
	};

	const validSearch = async (input) => {
		const value = input.value.toLowerCase();
		const fetchResult = await fetchSearchData(input, value);

		if (fetchResult.invalidSearch) {
			invalidSearch(input);
			return;
		}

		const amountInput = document.getElementById("amount");
		let resultOutput = [];
		for (const [key, value] of Object.entries(fetchResult)) {
			if (key === value) {
				return;
			}

			const amount = amountInput.value ? amountInput.value : 1;

			resultOutput.push({ key, value: value * amount });
		}
		setResults(resultOutput);
	};

	const invalidSearch = (input) => {
		let timeoutID;
		const callback = () => {
			timeoutID = setTimeout(() => {
				input.classList.remove("search-not-found");
			}, 2000);
		};
		if (timeoutID) {
			clearTimeout(timeoutID);
			callback();
			return;
		} else if (!timeoutID) {
			input.classList.add("search-not-found");
			callback();
		}
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
		<Container maxWidth="lg">
			<h1 className="heading">Currency Converter</h1>
			<Form submitHandler={handleSubmit} />
			<OutputTable
				results={results}
				currency={document.getElementById("input")}
				amount={document.getElementById("amount")}
			/>
		</Container>
	);
}

export default App;
