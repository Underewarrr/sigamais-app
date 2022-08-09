const connection = require('./connection');

async function getAll() {
  const [ customers ] = await connection.execute('SELECT id, name, cpf, email FROM customer');

  return customers;
}

async function getOne(id) {
  // PROIBIDO FAZER DESSA FORMA. SUJEITO A PAULADA.
  // const [ customer ] = await connection.execute(`SELECT * FROM customer WHERE id = ${id}`);
  const [ customer ] = await connection.execute(`SELECT id, name, cpf, email FROM customer WHERE id = ?`, [id]);

  return customer;
}

async function getByCpf(cpf) {
  const [ customer ] = 
  await connection.execute(`SELECT id, name, cpf, email FROM customer WHERE cpf = ?`,
  [cpf]);

  return customer;
}

async function getByEmail(email) {
  const [ customer ] = 
  await connection.execute(`SELECT id, name, cpf, email FROM customer WHERE email = ?`,
  [email]);

  return customer;
}

async function create({ name, cpf, email, password }) {
  const [ { insertId } ] = await connection.execute(`INSERT INTO customer (name, cpf, email, password)
    VALUES (?, ?, ?, ?)
  `, [name, cpf, email, password]);

  return { id: insertId, name, cpf, email, password }
}

async function loginByEmail({ email, password }) {
  const [ customer ] = await connection.execute(`
    SELECT id, name, cpf, email, password FROM customer WHERE email = ? AND password = ?`, [email, password]);
      
  return customer;
}

async function update(id, { name, cpf, email, password }) {
  await connection.execute(`
    UPDATE customer SET name = ?, email = ?, password = ?, cpf = ? WHERE id = ?`,
  [name, email, password, cpf, id]);
}

function deleteOne(id) {
  return connection.execute("DELETE FROM customer WHERE id = ?", [id]);
}


module.exports = { getAll, create, update, deleteOne, getOne, getByCpf, getByEmail, loginByEmail };