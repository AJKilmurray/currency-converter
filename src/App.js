import Form from "./components/form/Form";
import Navbar from "./components/navbar/Navbar";
import OutputTable from "./components/table/OutputTable";
import { useState, useReducer } from "react";
import Container from "@material-ui/core/Container";

function App() {
	// Search Results
	const [results, setResults] = useState([]);
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Search Field
		const currencyInputField = document.getElementById("input");

		if (!currencyInputField.value) {
			// currencyInputField value is empty
			invalidSearch(currencyInputField);
		} else if (currencyInputField.value) {
			// currencyInputField value is not empty (valid)
			validSearch(currencyInputField);
		}
	};

	const validSearch = async (input) => {
		// Currency (lowercased for fetch attempt)
		const value = input.value.toLowerCase();
		// Fetch data comparing the input currency to other world currencies
		const fetchResult = await fetchSearchData(input, value);

		// If the currency was an invalid search param
		if (fetchResult.invalidSearch) {
			invalidSearch(input);
			return;
		}

		renderResults(fetchResult);
	};

	// Invalid search params
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

	// Fetch API data based on search params
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

	const lowToHigh = () => {
		sortResults(results.sort((a, b) => a.value - b.value));
	};

	const highToLow = () => {
		sortResults(results.sort((a, b) => b.value - a.value));
	};

	const aToZ = () => {
		sortResults(results.sort((a, b) => a.key.localeCompare(b.key)));
	};

	const zToA = () => {
		sortResults(results.sort((a, b) => b.key.localeCompare(a.key)));
	};

	const renderResults = (data) => {
		// Amount input field
		const amountInput = document.getElementById("amount");
		// Array to push all search results
		let resultOutput = [];
		// Each search result is split into a key and value pair within the output array. (key: usd, value: 5 )
		for (const [key, value] of Object.entries(data)) {
			if (key === value) {
				return;
			}
			// If the amount input field value is empty, set to 1
			const amount = amountInput.value ? amountInput.value : 1;

			resultOutput.push({ key, value: value * amount });
		}
		console.log(resultOutput);
		// Updates the state of results to the new array
		setResults(resultOutput);
	};

	const sortResults = (sorted) => {
		setResults(sorted);
		forceUpdate();
	};

	return (
		<>
			<Navbar title="Currency Converter" />
			<Container maxWidth="lg">
				<Form
					submitHandler={handleSubmit}
					filter={results.length}
					filterHandlers={[() => lowToHigh(), () => highToLow(), () => aToZ(), () => zToA()]}
				/>
				<OutputTable
					results={results}
					currency={document.getElementById("input")}
					amount={document.getElementById("amount")}
				/>
			</Container>
		</>
	);
}

export default App;
