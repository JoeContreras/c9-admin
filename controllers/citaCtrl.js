const Cita = require("../models/citaModel");

const CitaCtrl = {
  create: async (req, res) => {
    const cita = new Cita({
      ...req.body,
      owner: req.user.id,
    });

    try {
      await cita.save();
      res.json({ msg: "Cliente creado" });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  fetchMany: async (req, res) => {
    try {
      const citas = await Cita.find({ owner: req.user.id });
      res.status(200).json(citas);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const cita = await Cita.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
      });
      if (!cita) {
        res.status(404).json({ msg: "No hay clientes registrados" });
      }
      res.status(200).json(cita);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  fetchOne: async (req, res) => {
    const _id = req.params.id;

    try {
      const cita = await Cita.findOne({ _id, owner: req.user.id });
      if (!cita) {
        res.status(404).json({ msg: "Cliente no existe" });
      }
      res.status(200).json(cita);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["nombre", "fecha", "lugar", "telefono"];
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
      return res.status(400).json({ err: "Invalid updates" });
    }

    try {
      const cita = await Cita.findOne({
        _id: req.params.id,
        owner: req.user.id,
      });
      updates.forEach((update) => (cita[update] = req.body[update]));
      await cita.save();
      /*
          const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
      */
      res.status(200).json(cita);
    } catch (err) {
      return res.status(404).json({ msg: err.message });
    }
  },
};

module.exports = CitaCtrl;
