const userRepository = require("../repositories/user.repositories");
const bcrypt = require("bcrypt");
const baseResponse = require("../utils/baseResponse.util");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!emailRegex.test(email)) {
      return baseResponse(res, false, 400, "Invalid email format", null);
    }
    if (!passwordRegex.test(password)) {
      return baseResponse(res, false, 400, "Invalid password format", null);
    }

    req.query.password = await bcrypt.hash(req.query.password, 10);
    const user = await userRepository.registerUser(req.query);
    baseResponse(res, true, 201, "User registered", user);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to register user", null);
  }
};

exports.loginUser = async (req, res) => {
  if (!req.query.email || !req.query.password) {
    return baseResponse(res, false, 400, "Email and Password Required", null);
  }

  try {
    const user = await userRepository.loginUser(
      req.query.email,
      req.query.password
    );
    // Verifikasi password
    bcrypt.compare(req.query.password, user.password, (err, result) => {
      if (err) throw err;
      if (result) {
        baseResponse(res, true, 200, "Login success", user);
      } else {
        baseResponse(res, false, 401, "Invalid password", null);
      }
    });
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 401, "Invalid email or password", null);
  }
};

exports.getUserByEmail = async (req, res) => {
  if (!req.params.email) {
    return baseResponse(res, false, 400, "Email Required", null);
  }
  try {
    const user = await userRepository.getUserByEmail(req.params.email);
    baseResponse(res, true, 200, "User found", user);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 404, "User not found", null);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
      return baseResponse(res, false, 400, "Invalid email format", null);
    }
    if (!passwordRegex.test(password)) {
      return baseResponse(res, false, 400, "Invalid password format", null);
    }

    req.body.password = await bcrypt.hash(password, 10);
    const user = await userRepository.updateUser(req.body.id, req.body);
    if (!user) {
      return baseResponse(res, false, 404, "User not found", null);
    }
    baseResponse(res, true, 200, "User updated", user);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to update user", null);
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await userRepository.getAll();
    baseResponse(res, true, 200, "Aman", users);
  } catch (error) {
    baseResponse(res, false, 500, "Gagal", null);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await userRepository.deleteUserById(req.params.id);
    if (!user) {
      return baseResponse(res, false, 404, "User not found", null);
    }
    baseResponse(res, true, 200, "User deleted", user);
  } catch (error) {
    baseResponse(res, false, 500, "Failed to delete user", null);
  }
};

exports.topUp = async (req, res) => {
  try {
    const { id, amount } = req.query;

    if (!id || !amount) {
      return baseResponse(res, false, 400, "ID and amount are required", null);
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return baseResponse(
        res,
        false,
        400,
        "Amount must be larger than 0",
        null
      );
    }

    const user = await userRepository.getUserById(id);
    if (!user) {
      return baseResponse(res, false, 404, "User not found", null);
    }

    const updatedUser = await userRepository.updateBalance(
      id,
      user.balance + numericAmount
    );
    baseResponse(res, true, 200, "Top up successful", updatedUser);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to top up balance", null);
  }
};
