const customerModel = require('../models/customers');
const fs = require('fs/promises');
const bcyrpt = require('bcrypt');

async function getAll() {
  const customer = await customerModel.getAll();

  return customer;
}

async function getOne(id) {
  const customer = await customerModel.getOne(id);

  if(!customer.length) {
    return { code: 404, message: "Cliente não encontrado!" }
  }

  return  { code: 200, data: customer[0] }
}

async function register(customer) {
  const exist = await customerModel.getByEmail(customer.email);

  if(exist.length) {
    return { code: 400, message: "Email já cadastrado!" }
  }

  fs.appendFile('inbox.txt', `Você foi cadastrado com sucesso! ${customer.name}\n`);

  const data = await customerModel.register(customer);

  return { code: 201, data };
}

async function login(email, password) {
  const customer = await customerModel.login(email, password);

  if(!customer.email) {
    return { code: 404, message: "Email não encontrado!" }
  }
  if (bcyrpt.compareSync(password, customer.password)) {
    fs.appendFile('inbox.txt', `Você fez login com sucesso! ${customer[0].name}\n`);
    return { code: 200, data: customer };
  }
}
  module.exports = { getAll, getOne, register, login }