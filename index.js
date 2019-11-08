const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set up express app
const app = express();

//connect to mongoose
mongoose.connect("mongodb://localhost/ninjago", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use("/api", routes);

//error handing middleware
app.use(function(err, req, res, next) {
  // console.log(err);
  res.send({ error: err.message });
});

//listen for requests
app.listen(process.env.port || 4000, function() {
  console.log("now listening for requests");
});
