const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./config/db");

app.get("/", (req, res) => res.send("Response Succsessed"));

db.authenticate().then(() => console.log("Connected database"));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));

app.listen(3002, () => console.log("Port Running at 3002"));

app.use(cors());

//API FOR POKEMON

const Pokemon = require("./model/Pokemon");

app.post("/catch", async (req, res) => {
  try {
    //   destructuring object
    const {
      pokemon_id,
      pokemon_front_default,
      pokemon_type_name,
      pokemon_name,
    } = req.body;

    // initialize models database
    const newPokemon = new Pokemon({
      pokemon_id,
      pokemon_front_default,
      pokemon_type_name,
      pokemon_name,
    });

    // await = menjalankan kode models pokemon
    await newPokemon.save();

    // menampilkan newpokemon ketika di save postman
    res.json(newPokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.get("/list", async (req, res) => {
  try {
    const getAllPokemon = await Pokemon.findAll({});
    const last_element = getAllPokemon[getAllPokemon.length - 1];

    res.json({
      data: getAllPokemon,
      length: last_element.id,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.get("/list/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const getPokemon = await Pokemon.findOne({
      where: { id: id },
    });

    res.json(getPokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletePokemon = await Pokemon.destroy({
      where: { id: id },
    });

    await deletePokemon;

    res.json("Pokemon has Released");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getPokemon = await Pokemon.findOne({
        where: { id: id },
      });
    const a = getPokemon.pokemon_name;
    var result = "";
    var number = 0;

    const myArray = a.split("-");
    if(myArray.length === 1){
        result = a.concat("-0");
    } else if(myArray.length === 2) {
        if(myArray[1] === "0"){
        var data1 = myArray[0]
        result = data1.concat("-",1);
        } else{
            var data1 = myArray[0]
            var number = parseInt(myArray[1])
            {
                let a = number * (1 + Math.sqrt(5)) / 2.0;
                dataNumber = Math.round(a);
                result = data1.concat("-",dataNumber);
            }
        }
    }
    const updatePokemon = await Pokemon.update(
      {
        pokemon_name: result,
      },
      { where: { id: id } }
    );

    await updatePokemon;
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
