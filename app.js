const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 7890;

app.use(async ctx => ctx.body = 'merry christmas');

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

