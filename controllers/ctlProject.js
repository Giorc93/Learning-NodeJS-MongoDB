"use strict";

var ProjectMdl = require("../models/mdlProject");
var fs = require("fs");

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

  listAll(req, res) {
    ProjectMdl.find({}).exec((error, projects) => {
      //.find({year: 2019}) works as WHERE on MySQL. Sort .find().sort({year}) or find.().sort({-year}) (ASC DESC)
      if (error)
        return res.status(500).send({ message: "Error retrieving data" }); // Another way to code the if condition
      if (!projects)
        return res.status(404).send({ message: "No projects to list" });

      return res.status(200).send({
        projects,
      });
    });
  },

  update: function (req, res) {
    var projectId = req.params.id;
    var update = req.body;

    ProjectMdl.findByIdAndUpdate(
      //Find the document by ID
      projectId,
      update,
      { new: true }, //Returns the updated document instead of the original
      (error, projectUpdated) => {
        if (error) return res.status(500).send({ message: "Error updating" });
        if (!projectUpdated)
          return res.status(404).send({ mesage: "Project does not exist" });

        return res.status(200).send({
          project: projectUpdated,
        });
      }
    );
  },

  delete: function (req, res) {
    var projectId = req.params.id;

    ProjectMdl.findByIdAndDelete(projectId, (error, projectDeleted) => {
      if (error) return res.status(500).send({ message: "Error deleting" });
      if (!projectDeleted)
        return res.status(404).send({ message: "Project does not exist" });
      return res.status(200).send({
        project: projectDeleted,
      });
    });
  },

  upload: function (req, res) {
    var projectId = req.params.id;
    var fileName = "Couldn't load image";

    if (req.files) {
      //Checks if file exists
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("/");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        ProjectMdl.findByIdAndUpdate(
          projectId,
          { image: fileName },
          (error, projectUpdated) => {
            if (error)
              return res.status(500).send({ message: "Error updating" });
            if (!projectUpdated)
              return res.status(404).send({ mesage: "Project does not exist" });
            return res.status(200).send({
              project: projectUpdated,
            });
          }
        );
        return res.status(200).send({
          files: fileName,
        });
      } else {
        fs.unlink(filePath, (error) => {
          return res.status(200).send({ message: "La extensión no es válida" });
        });
      }
    } else {
      return res.status(500).send({
        mesage: fileName,
      });
    }
  },
};

module.exports = controller; //Exporting allows to acces and use the file methods and objects
