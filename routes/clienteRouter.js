const router = require("express").Router();
const auth = require("../middleware/auth");
const ClienteCtrl = require("../controllers/clienteCtrl");

router.post("/clientes", auth, ClienteCtrl.create);

router.patch("/clientes/:id", auth, ClienteCtrl.update);

router.get("/clientes", auth, ClienteCtrl.fetchMany);

router.get("/clientes/search", auth, ClienteCtrl.fetchSearch);

router.get("/clientes/:id", auth, ClienteCtrl.fetchOne);

router.delete("/clientes/:id", auth, ClienteCtrl.delete);

module.exports = router;
