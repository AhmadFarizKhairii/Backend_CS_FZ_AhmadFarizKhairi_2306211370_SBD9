const db = require("../database/pg.database");

exports.createTransaction = async (user_id, item_id, quantity, total) => {
  const res = await db.query(
    "INSERT INTO transactions (user_id, item_id, quantity, total) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, item_id, quantity, total]
  );
  return res.rows[0];
};

exports.getAllTransactions = async () => {
  const query = `
    SELECT 
      t.*,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'email', u.email,
        'password', u.password,
        'balance', u.balance,
        'created_at', u.created_at
      ) AS user,
      json_build_object(
        'id', i.id,
        'name', i.name,
        'price', i.price,
        'store_id', i.store_id,
        'image_url', i.image_url,
        'stock', i.stock,
        'created_at', i.created_at
      ) AS item
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    JOIN items i ON t.item_id = i.id
    ORDER BY t.created_at DESC;
  `;

  const res = await db.query(query);
  return res.rows;
};

exports.getTransactionById = async (transactionId) => {
  const sql = `
    SELECT
      t.id,
      t.user_id,
      t.item_id,
      t.quantity,
      t.total,
      t.status,
      t.created_at,
      json_build_object(
        'id',    u.id,
        'name',  u.name,
        'email', u.email,
        'password', u.password,
        'balance',  u.balance,
        'created_at', u.created_at
      ) AS "user",
      json_build_object(
        'id',        i.id,
        'name',      i.name,
        'price',     i.price,
        'store_id',  i.store_id,
        'image_url', i.image_url,
        'stock',     i.stock,
        'created_at', i.created_at
      ) AS "item"
    FROM transactions t
    JOIN users u  ON u.id = t.user_id
    JOIN items i  ON i.id = t.item_id
    WHERE t.id = $1
  `;
  const res = await db.query(sql, [transactionId]);
  return res.rows[0];
};

exports.updateTransactionStatus = async (transactionId, status) => {
  try {
    const res = await db.query(
      "UPDATE transactions SET status = $1 WHERE id = $2 RETURNING *",
      [status, transactionId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to update transaction status", error);
    throw error;
  }
};

exports.deleteTransactionById = async (transactionId) => {
  try {
    const res = await db.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [transactionId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Failed to delete transaction", error);
    throw error;
  }
};
