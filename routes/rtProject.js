"use strict";

var express = require("express");
var multipart = require("connect-multiparty");
var ProjectController = require("../controllers/ctlProject");

var router = express.Router();
var multipartMiddleware = multipart({ uploadDir: "./uploads" }); //Setting middleware, stablishing uploads dir

router.get("/home", ProjectController.home); //Creating home route (get)
router.post("/test", ProjectController.test); //Creating test route (post)
router.post("/save", ProjectController.savePj); //Creating save route (post)
router.get("/list/:id?", ProjectController.list);
router.get("/listAll", ProjectController.listAll);
router.put("/update/:id", ProjectController.update);
router.delete("/delete/:id", ProjectController.delete);
router.post("/upload/:id", multipartMiddleware, ProjectController.upload); //Executing middleware before executing main  method

module.exports = router;
