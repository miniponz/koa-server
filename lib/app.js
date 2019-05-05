const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs'); //template engine


const app = new Koa();
const router = new KoaRouter();

app.use(json());

// app.use(async ctx => ctx.body = { message: 'merry christmas' });

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

router.get('/', async ctx => {
  await ctx.render('index');
});

router.get('/test', ctx => (ctx.body = { test: 'Hello Test' }));

// router middleware
app.use(router.routes()).use(router.allowedMethods());



module.exports = app;
