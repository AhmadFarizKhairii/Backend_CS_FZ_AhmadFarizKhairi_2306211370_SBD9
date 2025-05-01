const storeRepository = require("../repositories/store.repositories");

const baseResponse = require("../utils/baseResponse.util");
const csResponse = require("../utils/csResponse.util");

exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeRepository.getAllStores();
    baseResponse(res, true, 200, "Successfully retrieved all stores", stores);
  } catch (error) {
    baseResponse(res, false, 500, "Failed to retrieve all stores", null);
  }
};

exports.createStore = async (req, res) => {
  if (!req.body.name || !req.body.address) {
    return baseResponse(res, false, 400, "Name and Address Required", null);
  }
  try {
    const store = await storeRepository.createStore(req.body);
    baseResponse(res, true, 201, "Successfully created store", store);
  } catch (error) {
    baseResponse(res, false, 500, "Failed to create store", null);
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const store = await storeRepository.getStoreById(req.params.id);
    if (!store) {
      return baseResponse(res, false, 404, "Store not found", null);
    }
    baseResponse(res, true, 200, "Store Found", store);
  } catch (error) {
    baseResponse(res, false, 500, "Store not found", null);
  }
};

exports.updateStore = async (req, res) => {
  if (!req.body.Id) {
    return baseResponse(res, false, 400, "Store ID required", null);
  }
  try {
    const store = await storeRepository.updateStore(req.body.Id, req.body);
    if (!store) {
      return baseResponse(res, false, 404, "Store not found", null);
    }
    baseResponse(res, true, 200, "Store updated", store);
  } catch (error) {
    baseResponse(res, false, 500, "Failed to update store", null);
  }
};

exports.deleteStoreById = async (req, res) => {
  try {
    const store = await storeRepository.deleteStoreById(req.params.id);
    if (!store) {
      return baseResponse(res, false, 404, "Store not found", null);
    }
    baseResponse(res, true, 200, "Store deleted", store);
  } catch (error) {
    baseResponse(res, false, 500, "Failed to delete store", null);
  }
};
