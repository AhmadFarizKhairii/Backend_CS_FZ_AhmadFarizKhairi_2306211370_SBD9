const transactionRepository = require("../repositories/transaction.repositories");
const itemRepository = require("../repositories/item.repositories");
const userRepository = require("../repositories/user.repositories");
const baseResponse = require("../utils/baseResponse.util");

exports.createTransaction = async (req, res) => {
  const { user_id, item_id, quantity, total } = req.body;

  if (!user_id || !item_id || !quantity || !total) {
    return baseResponse(res, false, 400, "All fields are required");
  }

  try {
    const transaction = await transactionRepository.createTransaction(user_id, item_id, quantity, total);
    return baseResponse(res, true, 201, "Transaction created successfully", transaction);
  } catch (error) {
    return baseResponse(res, false, 500, "Error creating transaction", error);
  }
};

exports.payTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await transactionRepository.getTransactionById(
      transactionId
    );
    if (!transaction) {
      return baseResponse(res, false, 404, "Transaction not found", null);
    }

    const item = await itemRepository.getItemById(transaction.item_id);
    if (!item) {
      return baseResponse(res, false, 404, "Item not found", null);
    }

    const user = await userRepository.getUserById(transaction.user_id);
    if (!user) {
      return baseResponse(res, false, 404, "User not found", null);
    }

    if (user.balance < transaction.total) {
      return baseResponse(res, false, 400, "Insufficient balance", null);
    }

    if (item.stock < transaction.quantity) {
      return baseResponse(res, false, 400, "Insufficient stock", null);
    }

    // Deduct balance and stock
    await userRepository.updateBalance(transaction.user_id, -transaction.total);
    await itemRepository.updateStock(
      transaction.item_id,
      item.stock - transaction.quantity
    );

    // Update transaction status
    const updatedTransaction =
      await transactionRepository.updateTransactionStatus(
        transactionId,
        "paid"
      );

    baseResponse(res, true, 200, "Payment successful", updatedTransaction);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to pay", null);
  }
};

exports.deleteTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await transactionRepository.getTransactionById(
      transactionId
    );
    if (!transaction) {
      return baseResponse(res, false, 404, "Transaction not found", null);
    }

    await transactionRepository.deleteTransactionById(transactionId);
    baseResponse(res, true, 200, "Transaction deleted", transaction);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to delete transaction", null);
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionRepository.getAllTransactions();
    return baseResponse(res, true, 200, "Transactions found", transactions);
  } catch (error) {
    return baseResponse(res, false, 500, "Error retrieving transactions", error);
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const tx = await transactionRepository.getTransactionById(req.params.id);
    if (!tx) {
      return baseResponse(res, false, 404, 'Transaction not found', null);
    }
    return baseResponse(res, true, 200, 'Transaction found', tx);
  } catch (error) {
    console.error(error);
    return baseResponse(res, false, 500, 'Failed to retrieve transaction', null);
  }
};