const tutorials = require("../controllers/tutorial.controller");

var Tutorialrouter = require("express").Router();

module.exports = (app) => {
  // Create a new Tutorial
  Tutorialrouter.post("/", tutorials.create);

  // Retrieve all Tutorials
  Tutorialrouter.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  Tutorialrouter.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  Tutorialrouter.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  Tutorialrouter.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  Tutorialrouter.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  Tutorialrouter.delete("/", tutorials.deleteAll);

  app.use("/tutorials", Tutorialrouter);
};
