const router = require("express").Router();
const auth = require("../middleware/auth");
const CitaCtrl = require("../controllers/citaCtrl");

router.post("/citas", auth, CitaCtrl.create);

router.patch("/citas/:id", auth, CitaCtrl.update);

router.get("/citas", auth, CitaCtrl.fetchMany);

router.get("/citas/search", auth, CitaCtrl.fetchSearch);

router.get("/citas/:id", auth, CitaCtrl.fetchOne);

router.delete("/citas/:id", auth, CitaCtrl.delete);

module.exports = router;
