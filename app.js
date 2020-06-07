"use strict";

//Loading Mdolues
var express = require("express"); //Loading express obj
var bodyParser = require("body-parser"); //Loading body-parser

var app = express(); //Executing express

//Loading Routes Files

var projectRoutes = require("./routes/rtProject");

//Middlewares
//Method executed before main controller action

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Converts the data into JSON object

//CORS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes

app.use("/api", projectRoutes); //.use is a express method (middleware) executed through any kind of HTTP request given

//Exporting

module.exports = app;
