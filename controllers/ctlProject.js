"use strict";

var ProjectMdl = require("../models/mdlProject");

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: "Home funct.",
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: "Test funct,",
    });
  },
  savePj: function (req, res) {
    var project = new ProjectMdl();
    var params = req.body;

    console.log(params);

    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = params.image;

    project.save((error, projectStored) => {
      if (error) {
        return res.status(500).send({ mesage: "Error while saving" });
      }
      if (!projectStored) {
        return res.status(404).send({ mesage: "Could not save on DB" });
      }

      return res.status(200).send({ message: "Project saved succesfuly" });
    });

    return res.status(200).send({
      project: project,
      message: "Save method",
    });
  },

  list: function (req, res) {
    var projectId = req.params.id;

    if (projectId == null) {
      return res.status(404).send({ message: "Project does not exist" });
    }

    ProjectMdl.findById(projectId, (error, project) => {
      if (error) {
        return res.status(500).send({ message: "Error" });
      }
      if (!project) {
        return res.status(404).send({ message: "Project does not exist" });
      }
      return res.status(200).send({
        project,
      });
    });
  },
};

module.exports = controller; //Exporting allows to acces and use the file methods and objects
