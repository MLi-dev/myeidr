import fetch from "node-fetch";
const getRecordsById = async (req, res) => {
	try {
		const body = req.body;
		console.log(body);
		let headers = {
			"Content-Type": "application/json",
			Accept: "*/*",
			Authorization:
				"Eidr 10.5238/mli:10.5237/9241-BC57:BXM3mQKgqh32HmV2Dgg4AA==",
		};
		let query = `https://proxy.eidr.org/resolve/${body.eidr_id}?type=Full&followAlias=false`;
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
	getRecordsById,
};
