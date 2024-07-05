const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");

router.post("/create", BookController.createBook);
router.put("/update/:id", BookController.updateBook);
router.get("/get-details/:id", BookController.getDetailsBook);
router.delete("/delete/:id", BookController.deleteBook);
router.get("/get-all", BookController.getAllBook);
router.post("/delete-many", BookController.deleteMany);
router.get("/get-all-type", BookController.getAllType);

module.exports = router;
