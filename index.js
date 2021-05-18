const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const methodOverride = require('method-override');

// replace the "test" database with need database name 
mongoose.connect("mongodb://mongodb:27017/farmStand", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection Open")
  })
  .catch(err => {
    console.log("Mongo Connection ERROR: ")
    console.log(err)
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))

app.get("/", (req, res) => {
  res.render("home")
})

app.listen(3000, () => console.log("Server ready"));

// Bret Fisher: Docker for Node.js course Video 25
// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint () {
	console.info("Got SIGINT (aka ctrl-c in docker). Graceful shutdown ", new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm () {
  console.info("Got SIGTERM (docker container stop). Graceful shutdown ", new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
  // NOTE: server.close is for express based apps
  // If using hapi, use `server.stop`
  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
		}
		process.exit();
  })
}
// END Bret Fisher

module.exports = app;