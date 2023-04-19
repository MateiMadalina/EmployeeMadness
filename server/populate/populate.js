/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");

//employees json:
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");

//equipment json:
const eqNames = require("./nameEquip.json");
const eqTypes = require("./typeEquip.json");
const eqAmounts = require("./amountEquip.json");

//brands json:
const brandName = require("./brands.json");

//colors json:
const colorsList = require("./colors.json");

//bookd json:
const bookLIst = require("./books.json");

//Models:
const EmployeeModel = require("../db/employee.model");
const EquipmentModel =require("../db/equipments.model");
const BrandModel = require("../db/brands.model");
const ColorModel = require("../db/colors.model");


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}


const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateColors = async () => {
  await ColorModel.deleteMany({});

  const colors = colorsList.map((color) => ({
    name: color
  }));

  await ColorModel.create(...colors);
  console.log("Colors created");
};

const populateBrands = async () => {
  await BrandModel.deleteMany({});

  const brands = brandName.map((brand) => ({
    name: brand
  }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};


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
  const brands = await BrandModel.find();
  const colors = await ColorModel.find();

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipments),
    brand:pick(brands),
    present:pick([true,false]),
    color:pick(colors),
    readBooks:pick(bookLIst)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};


const main = async () => {
  await mongoose.connect(mongoUrl);
 
  await populateEquipments();
  
  await populateBrands();

  await populateColors();
  
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
