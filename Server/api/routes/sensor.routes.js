module.exports = app => {
    const sensors = require("../controllers/sensor.controller");
  
    // Create a new Sensor
    app.post("/sensors", sensors.create);
  
    // Retrieve all Sensor
    app.get("/sensors", sensors.findAll);
  
    // Retrieve a single Sensor with sensorId
    app.get("/sensors/:sensorId", sensors.findOne);
  
    // Update a Sensor with SensorId
    app.put("/sensors/:sensorId", sensors.update);
  
    // Delete a Sensor with SensorId
    app.delete("/sensors/:sensorId", sensors.delete);
  
    // Create a new SensorId
    app.delete("/sensors", sensors.deleteAll);
  };
  