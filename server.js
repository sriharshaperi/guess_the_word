const express = require("express");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express(); // To create an express application
const PORT = 3000;

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
