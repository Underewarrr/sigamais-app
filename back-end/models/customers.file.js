const fs = require('fs/promises');

const getAll = async () => {
  const result = await fs.readFile('./customers.json', 'utf-8');

  return JSON.parse(result);
}

module.exports = { getAll };
