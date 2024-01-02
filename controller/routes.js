const { Router } = require("express");
const route = Router();
const personController = require ("./person.js");

route.use('/person', personController);

module.exports = route;
