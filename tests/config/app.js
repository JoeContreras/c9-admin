const express = require("express");
const cors = require("cors");

require("./mongoose-con");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", require("../../routes/userRouter"));
app.use("/admin", require("../../routes/clienteRouter"));

module.exports = app;
