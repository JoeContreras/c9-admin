const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const Cliente = require("../../models/clienteModel");
const bcrypt = require("bcrypt");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "joe c",
  email: "contreras.joe098@gmail.com",
  password: "testing",
  role: 1,
};

const userTwoId = new mongoose.Types.ObjectId();
// const passwordTwo = "newpassword";
// const passwordHashTwo = hashPass(passwordTwo);
const userTwo = {
  _id: userTwoId,
  name: "david rodriguez",
  email: "joe.contreras809@gmail.com",
  password: "testing",
};

const clienteOne = {
  _id: new mongoose.Types.ObjectId(),
  nombre: "juan lopez",
  nombreEmpresa: "UTD",
  correo: "cliente1@gmail.com",
  telefono: "UTD",
  owner: userOne._id,
};

const clienteTwo = {
  _id: new mongoose.Types.ObjectId(),
  nombre: "ramiro lopez",
  nombreEmpresa: "UTD",
  correo: "cliente2@gmail.com",
  telefono: "Apple",
  owner: userOne._id,
};

const clienteThree = {
  _id: new mongoose.Types.ObjectId(),
  nombre: "joe contreras",
  nombreEmpresa: "UTD",
  correo: "cliente3@gmail.com",
  telefono: "google",
  owner: userTwo._id,
};

const setupDataBase = async () => {
  await User.deleteMany();
  await Cliente.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Cliente(clienteOne).save();
  await new Cliente(clienteTwo).save();
  await new Cliente(clienteThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  clienteOne,
  clienteTwo,
  clienteThree,
  setupDataBase,
};
