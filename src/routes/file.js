import express from "express";
const FileController = require("../controllers/fileController.js");
const router = express.Router();

router.post("/upload", FileController.upload);
router.get("/files", FileController.getListFiles);
router.get("/files/:name", FileController.download);

module.exports = router;
