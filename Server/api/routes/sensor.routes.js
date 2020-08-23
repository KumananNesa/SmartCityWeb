module.exports = appSensor => {
    const sensors = require("../controllers/sensor.controller");
  
    // Create a new Sensor
    appSensor.post("/sensors", sensors.create);
  
    // Retrieve all Sensor
    appSensor.get("/sensors", sensors.findAll);
  
    // Retrieve a single Sensor with sensorId
    appSensor.get("/sensors/:sensorId", sensors.findOne);
  
    // Update a Sensor with SensorId
    appSensor.put("/sensors/:sensorId", sensors.update);
  
    // Delete a Sensor with SensorId
    appSensor.delete("/sensors/:sensorId", sensors.delete);
  
    // Create a new SensorId
    appSensor.delete("/sensors", sensors.deleteAll);
  };
  