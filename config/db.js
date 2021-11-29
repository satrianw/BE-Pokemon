const sequilize = require("sequelize");

const db = new sequilize("pokemon", "root", "", {
  dialect: "mysql",
});

db.sync({});

module.exports = db;
