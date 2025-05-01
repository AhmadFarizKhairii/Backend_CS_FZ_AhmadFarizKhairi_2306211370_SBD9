const db = require("../database/pg.database");

exports.createItem = async (item) => {
  try {
    const res = await db.query(
      "INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [item.name, item.price, item.store_id, item.image_url, item.stock]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to create item", error);
    throw error;
  }
};

exports.updateStock = async (itemId, newStock) => {
  try {
    const res = await db.query(
      "UPDATE items SET stock = $1 WHERE id = $2 RETURNING *",
      [newStock, itemId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to update item stock", error);
    throw error;
  }
};

exports.getAllItems = async () => {
  try {
    // throw new Error("Simulated database error");

    const res = await db.query("SELECT * FROM items");
    return res.rows;
  } catch (error) {
    console.error("Failed to get all items", error);
    throw error;
  }
};

exports.getItemById = async (itemId) => {
  try {
    const res = await db.query("SELECT * FROM items WHERE id = $1", [itemId]);
    return res.rows[0];
  } catch (error) {
    console.error("Failed to get item by id", error);
    throw error;
  }
};

exports.getItemsByStoreId = async (storeId) => {
  try {
    const res = await db.query("SELECT * FROM items WHERE store_id = $1", [
      storeId,
    ]);
    return res.rows;
  } catch (error) {
    console.error("Failed to get items by store id", error);
    throw error;
  }
};

exports.updateItem = async (itemId, item) => {
  try {
    const res = await db.query(
      "UPDATE items SET name = $1, price = $2, store_id = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *",
      [item.name, item.price, item.store_id, item.image_url, item.stock, itemId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to update item", error);
    throw error;
  }
};

exports.deleteItemById = async (itemId) => {
  try {
    const res = await db.query("DELETE FROM items WHERE id = $1 RETURNING *", [
      itemId,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Failed to delete item", error);
    throw error;
  }
};
