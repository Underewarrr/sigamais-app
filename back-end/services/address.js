const addressModel = require('../models/address');

async function createOne(address) {
  const data = await addressModel.createOne(address);

  return { code: 201, data };
}

module.exports = { createOne };