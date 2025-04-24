const Router = require("koa-router");
const router = new Router({ prefix: "/user" });

const { register } = require("../controller/user");

const { userValidate, verifyUser, crpyPassword, verifyLogin, verifyUpdatePassword } = require("../middleware/user/index");
const { createTimesLimiter } = require("../middleware/limit-request/index");

router.post(
	"/register",
	createTimesLimiter({
		prefixKey: "post/user/register",
		message: "用户注册过于频繁 请稍后再试",
		max: 3,
	}),
	userValidate,
	verifyUser,
	crpyPassword,
	register
);
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - 用户
 *     summary: 用户登录
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: 用户账户
 *             password:
 *               type: string
 *               description: 用户密码
 *     responses:
 *       200:
 *         description: 登录成功
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: 用户身份凭证 可以拿到这个到swagger里的Authorize那里填入 就有权限了 还有一些信息自己登录试试就不赘述了
 *       500:
 *         description: 服务端错误
 */
module.exports = router;