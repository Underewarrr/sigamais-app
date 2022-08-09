const customerModel = require('./models/customers');
const addressModel = require('./models/address');

async function main() {
  const result = await customerModel.getAll();
  const result2 = await addressModel.createOne({ address: 'Rua 1', city: 'Salvador', state: 'BA'});

  console.table(result);
}

main();