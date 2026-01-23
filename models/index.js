const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
fs.readdirSync(__dirname)
  .filter(file => file !== "index.js" && file.endsWith(".js"))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model; // <-- IMPORTANT
  });

/* Associations here (optional)
db.User.hasMany(db.Vehicle, { foreignKey: "user_id" });
*/

module.exports = db;
