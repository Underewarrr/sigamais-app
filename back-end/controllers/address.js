const addressService = require('../services/address');

async function createAddress(req, res) {
  const { data, code } = await addressService.createOne({ ...req.body, customerId: req.params.customerId});

  res.status(code).json(data)
}

module.exports = { createAddress }