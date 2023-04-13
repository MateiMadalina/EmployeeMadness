require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipments.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());


app.route("/api/equipments/")
.get(async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipments);
})
.post(async (req,res,next) => {
  const equipment = req.body;
 
  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
})

app.route("/api/equipments/:id")
.get(async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);

  return res.json(equipment);
})
.patch(async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


app.route("/api/absent/")
.get(async (req, res) => {
  const equipments = await EmployeeModel.find({present:false}).sort({ created: "desc" });
  return res.json(equipments);
})

app.route("/api/employees/")
.get(async (req, res) => {
  const employees = await EmployeeModel.find()
  .populate("equipment")
  .sort({ created: "desc" });
  return res.json(employees);
})
.post(async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
})


app.route("/api/employees/:id")
.get(async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);

  return res.json(employee);
})
.patch(async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.route("/employees/:name")
.get(async (req, res) => {
  console.log(req.params.name);
  const name = req.params.name;
  const employees = await EmployeeModel.find({name: {$regex:new RegExp(name,"i")}});
  return res.json(employees);
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
