// credits andré soares for the original code
const express = require('express');
const rescue = require('./rescue');
const customerModel = require('./models/customers');

const customerController = require('./controllers/customers');
const addressController = require('./controllers/address');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }))
app.get('/customers', rescue(customerController.getAll));
app.get('/customers/:id', rescue(customerController.getOne));
app.post('/customers/create', rescue(customerController.createOne));
app.post('/customers/login', rescue(customerController.login));
app.post('/customers/:customerId/address', rescue(addressController.createAddress))


app.put('/customers/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const customer = await customerModel.getOne(id);

  if(!customer.length) {
    return res.status(404).json({ message: "Cliente não encontrado!"})
  }

  await customerModel.update(req.params.id, req.body)

  return res.status(200).end();
}))

app.delete('/customers/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const customer = await customerModel.getOne(id);

  if(!customer.length) {
    return res.status(404).json({ message: "Cliente não encontrado!"})
  }

  await customerModel.deleteOne(req.params.id)

  return res.status(200).end();
}));

app.use((err, req, res, next) => {
  console.log(err);

  return res.status(500).json({ message: 'Erro no servidor! '})
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))