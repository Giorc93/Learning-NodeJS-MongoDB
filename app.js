"use strict";

//Loading Mdolues
var express = require("express"); //Loading express obj
var bodyParser = require("body-parser"); //Loading body-parser

var app = express(); //Executing express

//Loading Routes Files

//Middlewares
//Method executed before main controller action

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Converts the data into JSON object

//CORS

//Routes

app.post("/test/:id", (req, res) => {
  console.log(req.body.name); //Data on body
  console.log(req.query); //Data on URl
  console.log(req.params); //URl parameter
  res.status(200).send({
    //Status 200 means it was completed succesfuly
    message: "Hello World from Node JS",
  });
});

//Exporting

module.exports = app;
