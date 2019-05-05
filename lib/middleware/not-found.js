module.exports = (async(ctx, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  try {
    await next();
  } catch(error) {
    ctx.status = error.status || 404;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
});
