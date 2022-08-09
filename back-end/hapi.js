const Hapi = require('@hapi/hapi');
const customerModel = require('./models/customers');
const customerService = require('./services/customers');

const init = async () => {

    const server = Hapi.server({
        port: 3333,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/hapi/customers',
        handler: async (request, h) => {
            return { ok: 'hapi api' };
        }
    });

    server.route({
      method: 'POST',
      path: '/hapi/customers',
      handler: async (req, h) => {
        const { data, message, code } = await customerService.create(req.payload);
      
        if(!data) {
          return h.response({ message }).code(code);
          // return res.status(400).json({ message: "Cliente já cadastrado!"})
        }
      
        return h.response(data).code(code);
      }
    });

    server.route({
      method: 'PUT',
      path: '/hapi/customers/{id}',
      handler: async (request, h) => {
        return { ok: 'hapi' };
      }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();