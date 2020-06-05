"use strict";

var mongoose = require("mongoose"); //Loading mongoose
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .set("useUnifiedTopology", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/portfolio") //Creating database connection
  .then(() => {
    console.log("Succesfuly connected");

    //Server creation
    app.listen(port, () => {
      console.log("Server listening on port:3700");
    });
  })
  .catch((error) => {
    console.log(error);
  });
