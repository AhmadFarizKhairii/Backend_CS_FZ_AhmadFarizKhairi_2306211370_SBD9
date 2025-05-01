const express = require("express");
const itemController = require("../controllers/item.controller");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), itemController.createItem);
router.get("/", itemController.getAllItems);
router.get("/byId/:id", itemController.getItemById);
router.get("/byStoreId/:store_id", itemController.getItemsByStoreId);
router.put("/", upload.single("image"), itemController.updateItem);
router.delete("/:id", itemController.deleteItemById);

module.exports = router;
