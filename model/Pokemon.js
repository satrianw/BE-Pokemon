const Sequelize = require("sequelize");
const db = require("../config/db");

const Pokemon = db.define(
  "pokemon",
  {
    pokemon_id: { type: Sequelize.INTEGER },
    pokemon_front_default: { type: Sequelize.STRING },
    pokemon_type_name: { type: Sequelize.STRING },
    pokemon_name: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Pokemon;
