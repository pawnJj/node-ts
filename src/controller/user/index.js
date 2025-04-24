const jwt = require("jsonwebtoken");
const { JWT_SECRET, ADMIN_PASSWORD } = require("../../config/config.default");
const { createUser, updateOwnUserInfo, getOneUserInfo, updatePassword, updateRole, getUserList, adminUpdateUserInfo, updateIp } = require("../../service/user/index");
const { result, ERRORCODE, throwError } = require("../../result/index");
const errorCode = ERRORCODE.USER;

class userController {
	async register(ctx) {
		try {
			console.log('!!!_--')
			const res = await createUser(ctx.request.body);
			// 保存用户id
			let ip = ctx.get("X-Real-IP") || ctx.get("X-Forwarded-For") || ctx.ip;
			await updateIp(res.id, ip.split(":").pop());

			ctx.body = result("用户注册成功", {
				id: res.id,
				username: res.username,
			});
		} catch (err) {
			console.error(err);
			return ctx.app.emit("error", throwError(errorCode, "用户注册失败"), ctx);
		}
	}
}

module.exports = new userController();