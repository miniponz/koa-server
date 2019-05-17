const router = require('koa-simple-router');
const Client = require('../Models/Client');

module.exports = router({ prefix: '/api/v1/clients' }, _ => {
  _.post('/', async(ctx, next) => {
    const {
      name,
      address,
      telephone,
      email,
      referredBy,
      notes
    } = ctx.request.body;

    await Client
      .create({
        name,
        address,
        telephone,
        email,
        referredBy,
        notes
      })
      .then(newClient => ctx.body = newClient)
      .then(ctx => ctx.app.emit('send', ctx))
      .catch(next);
  }),

  _.post('/throwerror', async(ctx, next) => {
    await next();
    throw new Error('Aghh! An error!');
  }),

  _.get('/', async(ctx, next) => {
    await Client
      .find()
      .then(response => ctx.body = response)
      .then(ctx => ctx.app.emit('send', ctx))
      .catch(next);
  });

  _.get('/id', async(ctx, next) => {
    ctx.body = await Client.find({ _id: ctx.query._id })
      .catch(next);
    ctx.app.emit('send', ctx);
  });

  _.get('/name', async(ctx, next) => {
    ctx.body = await Client.find({ 'name.first': ctx.query.first, 'name.last': ctx.query.last })
      .catch(next);
    ctx.app.emit('send', ctx);
  });

});


