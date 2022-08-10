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

async function register (req, res){

  const { data, message, code } = await customerService.register(req.body);

  if(!data) {
    return res.status(code).json({ message })
  }

  return res.status(code).json(data);
}

async function login(req, res) {
  const { data, code, message } = await customerService.login(req.body);
    if (!data) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(data);
}


module.exports = { getAll, getOne, register, login };