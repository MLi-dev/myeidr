import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
import QueryResult from "./components/QueryResult";
import ResolutionResult from "./components/ResolutionResult";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
	const [inputs, setInputs] = useState({
		title: "",
		eidr_id: "",
	});
	const [currentImage, setCurrentImage] = useState(null);
	const [prevImages, setPrevImages] = useState([]);
	const [response, setResponse] = useState({});
	const [searchType, setSearchType] = useState("");
	const callAPI = async (query, requestOptions) => {
		const response = await fetch(query, requestOptions);
		const json = await response.json();
		if (json.url === null) {
			alert("Oops! Something went wrong with that query, let's try again!");
		} else {
			setResponse(json);
		}
	};
	const makeQuery = () => {
		let requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};
		//let query = `https://cors-anywhere.herokuapp.com/https://proxy.eidr.org/resolve/${inputs.eidr_id}?type=Full&followAlias=false`;
		let query = "";
		if (searchType === "byQuery") {
			query = `http://localhost:3001/api/query`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ title: { words: inputs.title } }),
			};
		} else {
			query = `http://localhost:3001/api/resolve`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ eidr_id: inputs.eidr_id }),
			};
		}
		callAPI(query, requestOptions).catch(console.error);
	};
	const reset = () => {
		setInputs({
			title: "",
			eidr_id: "",
		});
	};
	const submitForm = () => {
		let defaultValues = {
			title: "Seinfeld",
			eidr_id: "10.5240/301C-0DFA-B184-5448-BB3E-I",
		};
		// for (const [key, value] of Object.entries(inputs)) {
		// 	if (value === "") {
		// 		inputs[key] = defaultValues[key];
		// 	}
		// }
		if (inputs.title === "" || inputs.title === " ") {
			setSearchType("byEidrId");
		} else {
			setSearchType("byQuery");
		}
		makeQuery();
	};

	return (
		<div className='whole-page'>
			<h1>Build Your Own Screenshot! 📸</h1>
			<APIForm
				inputs={inputs}
				handleChange={(e) =>
					setInputs((prevState) => ({
						...prevState,
						[e.target.name]: e.target.value.trim(),
					}))
				}
				onSubmit={submitForm}
			/>
			{currentImage ? (
				<img
					className='screenshot'
					src={currentImage}
					alt='Screenshot returned'
				/>
			) : (
				<div></div>
			)}
			<br></br>
			<div className='container'>
				{response && searchType === "byEidrId" && (
					<ResolutionResult response={response} />
				)}
				{response && searchType === "byQuery" && (
					<QueryResult items={response} />
				)}
			</div>
			<br></br>
		</div>
	);
};

export default App;
