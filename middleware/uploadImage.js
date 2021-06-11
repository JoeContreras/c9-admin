const fs = require("fs");

module.exports = function (req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "Upload a file" });
    }
    const file = req.files.file;
    console.log(file);
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File size too large" });
    } //1mb

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is invalid" });
    } //jpeg/png
    next();
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
