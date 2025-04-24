const User = require("../../model/user/user");

const { randomNickname, getIpAddress } = require("../../utils/tool");
const filterSensitive = require("../../utils/sensitive");

class UserService {
	/**
	 * 用户注册
	 * @param {*} user
	 */
	async createUser(user) {
		let { username, password, nick_name, qq } = user;

		// 过滤敏感词
		nick_name = await filterSensitive(nick_name);
		// 随机生成昵称
		nick_name = nick_name ? nick_name : randomNickname("小张的迷弟");
		const avatar = "http://mrzym.top/online/9bb507f4bd065759a3d093d04.webp";
		const res = await User.create({ username, password, nick_name, qq, avatar, role: 2 });

		return res.dataValues;
	}
	/**
	 * 修改用户ip地址
	 * @param {*} id
	 * @param {*} ip
	 */
	async updateIp(id, ip) {
		const res = await User.update(
			{
				ip,
			},
			{
				where: {
					id,
				},
			}
		);
		return res[0] > 0 ? true : false;
	}
	/**
   * 根据条件查找一个用户
   * @param { id, username,role}
   * @returns Users
   */
	async getOneUserInfo({ id, username, password, role }) {
		const whereOpt = {};
		console.log(id, username, password, role)
		id && Object.assign(whereOpt, { id });
		username && Object.assign(whereOpt, { username });
		password && Object.assign(whereOpt, { password });
		role && Object.assign(whereOpt, { role });
		const res = await User.findOne({
			attributes: { exclude: ["createdAt", "updatedAt"] },
			where: whereOpt,
		});
		return res ? res.dataValues : null;
	}
}

module.exports = new UserService();