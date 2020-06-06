"use strict";

var express = require("express");
var ProjectController = require("../controllers/ctlProject");

var router = express.Router();

router.get("/home", ProjectController.home); //Creating home route (get)
router.post("/test", ProjectController.test); //Creating test route (post)
router.post("/save", ProjectController.savePj); //Creating save route (post)
router.get("/list/:id?", ProjectController.list);

module.exports = router;
