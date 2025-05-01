const db = require("../database/pg.database");

exports.getAllStores = async () => {
  try {
    // // Intentionally throw an error to simulate a failure
    // throw new Error("Simulated database error");

    const res = await db.query("SELECT * FROM stores");
    return res.rows;
  } catch (error) {
    console.error("Failed to get all stores", error);
    // throw error;
  }
};

exports.createStore = async (store) => {
  try {
    const res = await db.query(
      "INSERT INTO stores (name, address) VALUES ($1, $2) RETURNING *",
      [store.name, store.address]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to create store", error);
  }
};

exports.getStoreById = async (storeId) => {
  try {
    const res = await db.query("SELECT * FROM stores WHERE id = $1", [storeId]);
    if (!res || !res.rows) {
      throw new Error("No rows returned from the database");
    }
    return res.rows[0];
  } catch (error) {
    console.error("Failed to get store by id", error);
    throw error;
  }
};

exports.updateStore = async (storeId, store) => {
  try {
    const res = await db.query(
      "UPDATE stores SET name = $1, address = $2 WHERE id = $3 RETURNING *",
      [store.name, store.address, storeId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to Update Store", error);
    throw error;
  }
};

exports.deleteStoreById = async (storeId) => {
  try {
    const res = await db.query("DELETE FROM stores WHERE id = $1 RETURNING *", [
      storeId,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Failed to delete store", error);
  }
};
