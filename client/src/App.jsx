import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
import ResolutionResult from "./components/ResolutionResult";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
	const [inputs, setInputs] = useState({
		url: "",
		eidr_id: "",
		no_ads: "",
		no_cookie_banners: "",
		width: "",
		height: "",
	});
	const [currentImage, setCurrentImage] = useState(null);
	const [prevImages, setPrevImages] = useState([]);
	const [response, setResponse] = useState({});
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
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ eidr_id: inputs.eidr_id }),
		};
		//let query = `https://cors-anywhere.herokuapp.com/https://proxy.eidr.org/resolve/${inputs.eidr_id}?type=Full&followAlias=false`;
		let query = `http://localhost:3001/api/resolve`;
		callAPI(query, requestOptions).catch(console.error);
	};
	const reset = () => {
		setInputs({
			url: "",
			eidr_id: "",
			no_ads: "",
			no_cookie_banners: "",
			width: "",
			height: "",
		});
	};
	const submitForm = () => {
		let defaultValues = {
			eidr_id: "10.5240/301C-0DFA-B184-5448-BB3E-I",
			no_ads: "true",
			no_cookie_banners: "true",
			width: "1920",
			height: "1080",
		};
		if (inputs.url === "" || inputs.url === " ") {
			alert("You forgot to submit a url!");
		} else {
			for (const [key, value] of Object.entries(inputs)) {
				if (value === "") {
					inputs[key] = defaultValues[key];
				}
			}
			makeQuery();
		}
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
				{response && <ResolutionResult response={response} />}
			</div>
			<br></br>
		</div>
	);
};

export default App;
