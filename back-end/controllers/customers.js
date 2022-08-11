const customerService = require('../services/customers');

async function getAll(req, res) {
  const customer = await customerService.getAll();

  return res.status(200).json(customer);
}

async function getOne(req, res){
  const { id } = req.params;

  const { data, code, message } = await customerService.getOne(id);

  if(!data) {
    return res.status(code).json({ message })
  }

  return res.status(code).json(data);
}

async function createOne (req, res){

  const { data, message, code } = await customerService.create(req.body);

  if(!data) {
    return res.status(code).json({ message })
  }

  return res.status(code).json(data);
}

async function loginByEmail(req, res) {
  const { data, code, message } = await customerService.loginByEmail(req.body);
    if (!data) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(data);
}

module.exports = { getAll, getOne, createOne, loginByEmail };