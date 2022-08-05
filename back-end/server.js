const express = require('express');
const rescue = require('./rescue');
const usersModel = require('./models/user/users');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }))

app.get('/user', rescue(async (req, res) => {
  const user = await usersModel.getAll();

  return res.status(200).json(user);
}));

app.get('/customers/:id', rescue(async (req, res) => {
  const { id } = req.params;

  // PROIBIDO FAZER DESSA FORMA. SUJEITO A PAULADA.
  // const [ customer ] = await connection.execute(`SELECT * FROM customer WHERE id = ${id}`);
  const customer = await customerModel.getOne(id);

  return res.status(200).json(customer);
}));

app.post('/customers', rescue(async (req, res) => {
  const customer = await customerModel.create(req.body)

  return res.status(201).json(customer);
}))

app.put('/customers/:id', rescue(async (req, res) => {
  await customerModel.update(req.params.id, req.body)

  return res.status(200).end();
}))

app.delete('/customers/:id', rescue(async (req, res) => {
  await customerModel.deleteOne(req.params.id)

  return res.status(200).end();
}));

app.use((err, req, res, next) => {
  console.log(err);

  return res.status(500).json({ message: 'Erro no servidor! '})
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))