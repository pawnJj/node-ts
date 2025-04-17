const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { Sequelize } = require('sequelize');

const { initWebsocket } = require("./src/utils/websocket");

const app = new Koa();
const router = new Router();

// 创建Sequelize实例
// const sequelize = new Sequelize('online_blog', 'root', '2869410800', {
//   host: 'localhost',
//   dialect: 'mysql',
//   timezone: "+08:00",
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("数据库连接成功");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("数据库连接失败");
//   });

  initWebsocket();
// 使用bodyparser中间件
app.use(bodyParser());

// 设置一个简单的GET路由
router.get('/', async (ctx) => {
  ctx.body = 'Hello Koa!';
});

// 添加一个查询数据库的路由
// router.get('/users', async (ctx) => {
//   const rows = await User.findAll();
//   ctx.body = rows;
// });

// 定义User模型
// const User = sequelize.define('User', {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// }, {
//   timestamps: true,
//   createdAt: 'created_at',
//   updatedAt: false
// });

// 使用路由中间件
app.use(router.routes());



// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});