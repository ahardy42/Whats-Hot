// dependencies
const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// set up routes for the app
app.use(routes);

app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

module.exports = app;