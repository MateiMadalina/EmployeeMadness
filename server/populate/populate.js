/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const eqNames = require("./nameEquip.json");
const eqTypes = require("./typeEquip.json");
const eqAmounts = require("./amountEquip.json")
const EmployeeModel = require("../db/employee.model");
const EquipmentModel =require("../db/equipments.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipments = eqNames.map((eqName) => ({
    name: eqName,
    type: pick(eqTypes),
    amount: pick(eqAmounts),
  }));

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find();

  console.log(equipments);

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipments),
    present:pick([true,false]),
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipments();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
