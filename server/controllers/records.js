import fetch from "node-fetch";
const getRecords = async (req, res) => {
	try {
		let headers = {
			"Content-Type": "application/json",
			Accept: "*/*",
			Authorization:
				"Eidr 10.5238/mli:10.5237/9241-BC57:BXM3mQKgqh32HmV2Dgg4AA==",
		};
		let query = `https://proxy.eidr.org/resolve/10.5240/301C-0DFA-B184-5448-BB3E-I?type=Full&followAlias=false`;
		//let query = `https://api.apiflash.com/v1/urltoimage?access_key=856dc7c869ad411da1c494579c8a3f50&url=https%3A%2F%2Fwww.britannica.com%2Fanimal%2Ffish`;
		const response = await fetch(query, {
			method: "GET",
			headers: headers,
		});
		const jsonResp = await response.json();
		res.status(200).json(jsonResp);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export default {
	getRecords,
};
