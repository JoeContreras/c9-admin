const Cliente = require("../models/clienteModel");
const ClienteCtrl = {
  create: async (req, res) => {
    const cliente = new Cliente({
      ...req.body,
      owner: req.user.id,
    });

    try {
      await cliente.save();
      res.json({ msg: "Cliente creado" });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  fetchMany: async (req, res) => {
    try {
      const clientes = await Cliente.find({ owner: req.user.id });
      res.status(200).json(clientes);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  fetchSearch: async (req, res) => {
    const { searchQuery } = req.query;
    try {
      const nombre = new RegExp(searchQuery, "i");
      const clientes = await Cliente.find({
        $and: [{ nombre }, { owner: req.user.id }],
      });
      // const clientes = await Cliente.find({ owner: req.user.id });
      res.status(200).json(clientes);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const cliente = await Cliente.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
      });
      if (!cliente) {
        res.status(404).json({ msg: "No hay clientes registrados" });
      }
      res.status(200).json(cliente);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  fetchOne: async (req, res) => {
    const _id = req.params.id;

    try {
      const cliente = await Cliente.findOne({ _id, owner: req.user.id });
      if (!cliente) {
        res.status(404).json({ msg: "Cliente no existe" });
      }
      res.status(200).json(cliente);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["nombre", "nombreEmpresa", "correo", "telefono"];
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
      return res.status(400).json({ err: "Invalid updates" });
    }

    try {
      const cliente = await Cliente.findOne({
        _id: req.params.id,
        owner: req.user.id,
      });
      updates.forEach((update) => (cliente[update] = req.body[update]));
      await cliente.save();
      /*
          const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
      */
      res.status(200).json(cliente);
    } catch (err) {
      return res.status(404).json({ msg: err.message });
    }
  },
};

module.exports = ClienteCtrl;
