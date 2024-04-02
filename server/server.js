import express from "express";
import recordRouter from "./routes/records.js";

const app = express();

app.get("/", (req, res) => {
	res
		.status(200)
		.send('<h1 style="text-align: center; margin-top: 50px;">MYEIDR API</h1>');
});

app.use("/resolve", recordRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
