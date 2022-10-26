const connection = require('./connection');

async function createOne({ customerId, address, city, state }) {
  const [{ insertId }] = await connection.execute(`INSERT INTO address (address, city, state, customerId) 
  VALUES (?, ?, ?, ?)`, [address, city, state, customerId]);

  return { id: insertId, address, city, state }
}

module.exports = { createOne }