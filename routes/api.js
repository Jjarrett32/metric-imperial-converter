"use strict";
const express = require("express");
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

module.exports = function getRoutes() {
  const router = express.Router();
  //routes will go here with there function
  router.get("/convert", getMetricConverter);

  return router;
}; 

function getMetricConverter(req, res) {
  let input = req.query.input;
  let initNum = convertHandler.getNum(input);
  let initUnit = convertHandler.getUnit(input);

  if (!initNum && !initUnit) {
    res.send("invalid number and unit");
  } else if (!initNum) {
    res.send("invalid number");
  } else if (!initUnit) {
    res.send("invalid unit");
  }

  let returnNum = convertHandler.convert(initNum, initUnit)
  let returnUnit = convertHandler.getReturnUnit(initUnit)
  let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

  res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
}
