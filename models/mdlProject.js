"use strict";

var mongoose = require("mongoose"); //Loading mongoose module in order to work with models

var Schema = mongoose.Schema;

//Creating the model for the objects

var ProjectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String,
});

module.exports = mongoose.model("Project", ProjectSchema); //Mongoose automatically generates the collection 'projects' from 'Project'. Exporting allows to use the methods anywhere
