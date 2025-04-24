const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const http = require('http');
const { Sequelize } = require('sequelize');

const { initWebsocket } = require("./src/utils/websocket");


const logger = require("koa-logger");
const swagger = require("./src/utils/swagger"); // 存放swagger.js的位置，可以自行配置
const { koaSwagger } = require("koa2-swagger-ui");

const app = new Koa();


// 使用bodyparser中间件
app.use(bodyParser());
// router.get('/123', async (ctx) => {
//   ctx.body = 'Hello Koa!';
// });
app.use(logger());
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


app.use(swagger.routes(), swagger.allowedMethods());
// 接口文档
app.use(
	koaSwagger({
		routePrefix: "/swagger", // 接口文档访问地址
		swaggerOptions: {
			url: "/swagger.json", // example path to json 其实就是之后swagger-jsdoc生成的文档地址
		},
	})
);

const server = http.createServer(app.callback());

initWebsocket(server);
// 设置一个简单的GET路由


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




// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});