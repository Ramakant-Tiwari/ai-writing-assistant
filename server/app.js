const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/rephrase", require("./routes/rephrase.js"));
app.use("/api/spell-check", require("./routes/spellCheck.js"));
app.use("/api/grammar-check", require("./routes/grammarCheck.js"));

app.listen(PORT, console.log("http://localhost:" + PORT));
