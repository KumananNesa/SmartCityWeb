const Sensor = require("../model/sensor.model.js");


// Create and Save a new Sensor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Sensor
  const sensor = new Sensor({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Sensor in the database
  Sensor.create(sensor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sensor."
      });
    else res.send(data);
  });
};

// Retrieve all Sensors from the database.
exports.findAll = (req, res) => {
  Sensor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sensor."
      });
    else res.send(data);
  });
};

// Find a single Sensors with a SensorIs
exports.findOne = (req, res) => {
  Sensor.findById(req.params.sensorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sensor with id ${req.params.sensorId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Sensor with id " + req.params.sensorId
        });
      }
    } else res.send(data);
  });
};

// Update a Sensor identified by the SensorId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Sensor.updateById(
    req.params.sensorId,
    new Sensor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sensors with id ${req.params.sensorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Sensors with id " + req.params.sensorId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Sensor with the specified SensorID in the request
exports.delete = (req, res) => {
    Sensor.remove(req.params.sensorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sensor with id ${req.params.sensorId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Sensor with id " + req.params.sensorId
        });
      }
    } else res.send({ message: `Sensor was deleted successfully!` });
  });
};

// Delete all Sensors from the database.
exports.deleteAll = (req, res) => {
    Sensor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sensors."
      });
    else res.send({ message: `All Sensors were deleted successfully!` });
  });
};
