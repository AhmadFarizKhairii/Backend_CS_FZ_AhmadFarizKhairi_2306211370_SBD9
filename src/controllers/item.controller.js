const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const itemRepository = require("../repositories/item.repositories");
const storeRepository = require("../repositories/store.repositories");
const baseResponse = require("../utils/baseResponse.util");

exports.createItem = async (req, res) => {
  try {
    const store = await storeRepository.getStoreById(req.body.store_id);
    if (!store) {
      return baseResponse(res, false, 400, "Store doesn't exist", null);
    }

    if (!req.file) {
      return baseResponse(res, false, 400, "Image file is required!", null);
    }

    // Upload to Cloudinary using buffer (since multer is using memoryStorage)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "items" }, // Optional: specify folder in Cloudinary
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer); // Use buffer instead of file path
    });

    // Save item to the database
    const item = await itemRepository.createItem({
      ...req.body,
      image_url: result.secure_url,
    });

    baseResponse(res, true, 201, "Item created", item);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to create item", null);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemRepository.getAllItems();
    baseResponse(res, true, 200, "Items Found", items);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Item not found", null);
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await itemRepository.getItemById(req.params.id);
    if (!item) {
      return baseResponse(res, false, 404, "Item not found", null);
    }
    baseResponse(res, true, 200, "Item Found", item);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to retrieve item", null);
  }
};

exports.getItemsByStoreId = async (req, res) => {
  try {
    const store = await storeRepository.getStoreById(req.params.store_id);
    if (!store) {
      return baseResponse(res, false, 400, "Store doesn't exist", null);
    }

    const items = await itemRepository.getItemsByStoreId(req.params.store_id);
    baseResponse(res, true, 200, "Items retrieved", items);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to retrieve items", null);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const store = await storeRepository.getStoreById(req.body.store_id);
    if (!store) {
      return baseResponse(res, false, 400, "Invalid store ID", null);
    }

    const item = await itemRepository.getItemById(req.body.id);
    if (!item) {
      return baseResponse(res, false, 404, "Item not found", null);
    }

    const updatedItem = await itemRepository.updateItem(req.body.id, req.body);
    baseResponse(res, true, 200, "Item updated", updatedItem);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to update item", null);
  }
};

exports.deleteItemById = async (req, res) => {
  try {
    const item = await itemRepository.getItemById(req.params.id);
    if (!item) {
      return baseResponse(res, false, 404, "Item not found", null);
    }

    await itemRepository.deleteItemById(req.params.id);
    baseResponse(res, true, 200, "Item deleted", item);
  } catch (error) {
    console.error(error);
    baseResponse(res, false, 500, "Failed to delete item", null);
  }
};
