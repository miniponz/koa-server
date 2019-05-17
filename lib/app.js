const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const convert = require('koa-convert');
const koaRes = require('koa-res');
const handleError = require('koa-handle-error');
const json = require('koa-json');
const clients = require('./routes/clients');
// const path = require('path');
// const render = require('koa-ejs'); //template engine
// const mongoconnection = require('./middleware/mongo-connection');

const app = new Koa();

const onError = err => {
  console.error(err);
};

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(convert(koaRes()));
app.use(handleError(onError));

app.use(clients);
// logger

app.use(async(ctx, next) => {
  await next();
  const responseTime = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url}-${responseTime}`);
});
// x-response-time
app.use(async(ctx, next) => {
  const start = Date.now().toLocaleString();
  await next();
  const ms = Date.now().toLocaleString() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
//response

// app.use(async ctx => {
//   ctx.body = 
// })



module.exports = app;

// const router = new KoaRouter();
// render(app, {s
//   root: path.join(__dirname, 'views'),
//   layout: 'layout',
//   viewExt: 'html',
//   cache: false,
//   debug: false
// });

// router.get('/', async ctx => {
//   await ctx.render('index');
// });

// router.get('/test', ctx => (ctx.body = { test: 'Hello Test' }));
// app.use(router.routes()).use(router.allowedMethods());
