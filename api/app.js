const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const genCoverLetterRouter = require("./routes/genCoverLetter");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/generate", genCoverLetterRouter);

module.exports = app;
