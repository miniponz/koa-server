const router = require('koa-simple-router');
const Client = require('../Models/Client');

router(_ => {
  _.get('/', async(ctx) => {
    const {
      name,
      address,
      telephone,
      email,
      referredBy,
      notes
    } = ctx.req.body;

    Client
      .create({
        name,
        address,
        telephone,
        email,
        referredBy,
        notes
      })
      .then(newClient => ctx.app.emit('send', ctx))
  }),
  _.get('/throwerror', async(ctx) => {
    throw new Error('Aghh! An error!');
  });

  // _.get('/tasks', task.getTasks),
  // _.post('/task', task.createTask),
  // _.put('/task', task.updateTask),
  // _.delete('/task', task.deleteTask),
  // _.post('/task/multi', task.createConcurrentTasks),
  // _.delete('/task/multi', task.deleteConcurrentTasks)
});
