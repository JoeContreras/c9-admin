const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema(
  {
    nombre: {
      required: true,
      trim: true,
      type: String,
    },
    fecha: {
      required: true,
      trim: true,
      type: Date,
    },
    lugar: {
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

const Cita = mongoose.model("Cita", citaSchema);

module.exports = Cita;
