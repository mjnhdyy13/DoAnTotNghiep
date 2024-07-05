const express = require("express");
const router = express.Router();
const MusicController = require("../controllers/MusicController");

router.post("/create", MusicController.createMusic);
router.put("/update/:id", MusicController.updateMusic);
router.get("/get-details/:id", MusicController.getDetailsMusic);
router.delete("/delete/:id", MusicController.deleteMusic);
router.get("/get-all", MusicController.getAllMusic);
router.post("/delete-many", MusicController.deleteMany);
router.get("/get-all-type", MusicController.getAllType);

module.exports = router;
