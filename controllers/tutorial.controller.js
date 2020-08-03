const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
// Validate request
exports.create = (req, res) => {
  const { title, description, published } = req.body;
  if (!title) {
    res.status(400).json({
      message: {
        msgBody: "Data  cannot be empty!",
        msgError: true,
      },
    });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: title,
    description: description,
    published: published ? published : false,
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then((data) => {
      res.status(200).json({
        tutorial: {
          title: data.title,
          description: data.description,
          published: data.published,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          id: data.id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Error has occurred",
          msgError: true,
        },
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Error has occurred",
          msgError: true,
        },
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(400).json({
          message: {
            msgBody: "Data  cannot be empty!",
            msgError: true,
          },
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Error retrieving Tutorial with id=" + id,
          msgError: true,
        },
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: {
        msgBody: "Data to update can not be empty!",
        msgError: true,
      },
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).json({
          message: {
            msgBody: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
            msgError: true,
          },
        });
      } else
        res.status(200).json({
          message: {
            msgBody: "Tutorial was updated successfully.",
            msgError: false,
          },
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Error updating Tutorial with id=" + id,
          msgError: true,
        },
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).json({
          message: {
            msgBody: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Tutorial was deleted successfully!",
            msgError: false,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Could not delete Tutorial with id=" + id,
          msgError: true,
        },
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.status(200).json({
        message: {
          msgBody: `${data.deletedCount} Tutorials were deleted successfully!`,
          msgError: false,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Error has occurred",
          msgError: true,
        },
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: {
          msgBody: err.message || "Error has occurred",
          msgError: true,
        },
      });
    });
};
