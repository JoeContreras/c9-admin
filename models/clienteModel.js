const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      required: true,
      trim: true,
      type: String,
    },
    nombreEmpresa: {
      required: true,
      trim: true,
      type: String,
    },
    correo: {
      required: true,
      trim: true,
      type: String,
    },
    telefono: {
      required: true,
      trim: true,
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
