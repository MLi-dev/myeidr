const ResolutionResult = ({ response }) => {
	const inputs = [];
	for (let k of Object.keys(response)) {
		if (typeof response[k] === "string") {
			let pair = {};
			pair.key = k;
			pair.value = response[k];
			inputs.push(pair);
		} else if (typeof response[k] === "object" && response[k].length > 0) {
			let arr = response[k];
			arr.forEach((obj) => {
				let pair = {};
				pair.key = k;
				pair.value = obj.value;
				inputs.push(pair);
			});
			console.log("I am array");
		} else {
			let pair = {};
			pair.key = k;
			if (k === "ResourceName") {
				pair.value = `${response[k].value} ${response[k]._lang} ${response[k]._titleClass}`;
			} else if (k === "Administrators") {
				pair.value = `${response[k].Registrant}`;
			} else if (k === "ExtraObjectMetadata") {
				pair.value = `${response[k]?.SeriesInfo?.DateRequired} ${response[k]?.SeriesInfo?.EndDate} ${response[k]?.SeriesInfo?.NumberRequired} ${response[k]?.SeriesInfo?.OriginalTitleRequired}`;
			}

			inputs.push(pair);
		}
	}
	console.log(inputs);
	return (
		<div>
			<h2>Your Query Result:</h2>
			<table className='image-container'>
				<tbody>
					{inputs &&
						inputs.length > 0 &&
						inputs.map((input, index) => {
							return (
								<tr className={index % 2 === 0 ? "even" : "odd"} key={index}>
									<td>{input.key}</td>
									<td>
										<tr>
											<td>Line1:</td>
										</tr>
										<tr>
											<td>{input.value}</td>
										</tr>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default ResolutionResult;
