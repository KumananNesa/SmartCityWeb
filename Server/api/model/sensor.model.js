const sql = require("./db.js");

// constructor
const Sensor = function(sensor) {
  this.sensortype = sensor.sensortype;
  this.numberofvehicle = sensor.numberofvehicle;
  this.idbollard = sensor.idbollard;

};

Sensor.create = (newSensor, result) => {
  sql.query("INSERT INTO vehicleSensor SET ?", newSensor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sensor: ", { id: res.insertId, ...newSensor });
    result(null, { id: res.insertId, ...newSensor });
  });
};

Sensor.findById = (sensorId, result) => {
  sql.query(`SELECT * FROM vehicleSensor WHERE id = ${sensorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sensor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found sensor with the id
    result({ kind: "not_found" }, null);
  });
};

Sensor.getAll = result => {
  sql.query("SELECT * FROM vehicleSensor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sensors: ", res);
    result(null, res);
  });
};

Sensor.updateById = (id, sensor, result) => {
  sql.query(
    "UPDATE vehicleSensor SET sensortype = ?, numberofvehicle = ?, idbollard = ? WHERE id = ?",
    [sensor.sensortype, sensor.numberofvehicle, sensor.idbollard, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found sensor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Sensor: ", { id: id, ...sensor });
      result(null, { id: id, ...sensor });
    }
  );
};

Sensor.remove = (id, result) => {
  sql.query("DELETE FROM vehicleSensor WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found sensor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vehicleSensor with id: ", id);
    result(null, res);
  });
};

Sensor.removeAll = result => {
  sql.query("DELETE FROM vehicleSensor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} vehicleSensor`);
    result(null, res);
  });
};

module.exports = Sensor;
