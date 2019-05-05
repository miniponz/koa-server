const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = require('koa-simple-router');
const jsonError = require('koa-json-error');
const logger = require('koa-logger');
const convert = require('koa-convert');
const koaRes = require('koa-res');
const handleError = require('koa-handle-error');
const json = require('koa-json');
// const path = require('path');
// const render = require('koa-ejs'); //template engine
const mongoconnection = require('./middleware/mongo-connection');

const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(convert(koaRes()));
app.use(handleError());


app.use('/api/vi/client', mongoconnection, require('./routes/clients'));

app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));


module.exports = app;

// const router = new KoaRouter();
// render(app, {
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