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

//Routes

app.use("/api", projectRoutes); //.use is a express method (middleware) executed through any kind of HTTP request given

//Exporting

module.exports = app;
