const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const router = express.Router();

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post("/create", transactionController.createTransaction);
router.post("/pay/:id", transactionController.payTransaction);
router.delete("/:id", transactionController.deleteTransactionById);

module.exports = router;
