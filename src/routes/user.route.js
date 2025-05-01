const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getAll", userController.getAll);
router.get("/:email", userController.getUserByEmail);
router.put("/", userController.updateUser);
router.delete("/:id", userController.deleteUserById);
router.post("/topUp", userController.topUp);

module.exports = router;
