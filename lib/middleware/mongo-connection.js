const mongoose = require('mongoose');
const state = require('mongoose/lib/connectionstate');

module.exports = (async(ctx, next) => {
  const readyState = mongoose.connection.readyState;

  if(readyState === state.connected || readyState === state.connecting) {
    await next();
  } else {
    const error = new Error('Unable to connect to db');
    error.status = 500;
    ctx.status = error.status;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
});
