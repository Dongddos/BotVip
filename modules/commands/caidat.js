module.exports.config = {
	name: "caidat",
	version: "1.0.3",
	hasPermssion: 0,
	credits: "Thiệu Trung Kiên",
	description: "Command Prompt",
	commandCategory: "tiện ích",
	cooldowns: 5,
	dependencies: {
		axios: ""
	}
}, module.exports.languages = {
	vi: {
		returnResult: "Đây là kết quả phù hợp: \n",
		returnNull: "Không tìm thấy kết quả dựa vào tìm kiếm của bạn!"
	},
	en: {
		returnResult: "This is your result: \n",
		returnNull: "There is no result with your input!"
	}
}, /*module.exports.handleEvent = async function({
	api: e,
	event: n,
	args: a,
	Users: s,
	Threads: t
}) {
	const r = require("moment-timezone");
	var o = r.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss"),
		i = global.config.ADMINBOT,
		g = r.tz("Asia/Ho_Chi_Minh").format("ss");
	if (o == `12:00:${g}` && g < 6)
		for (let n of i) setTimeout((() => e.sendMessage(`〉Bây giờ là: ${o}\n[❗] Bot sẽ tiến hành khởi động lại !`, n, (() => process.exit(1)))), 1000)
},*/ module.exports.run = async function({
	api: e,
	event: n,
	getText: a,
	args: s
}) {
	if (!s[0]) return e.sendMessage("🛠 | Đây là toàn bộ cài đặt của bot | 🛠\n=== Quản Lý Cài Đặt ===\n[1] Prefix.\n[2] Tên bot.\n[3] Danh sách Admin.\n[4] Ngôn ngữ.\n[5] Tự khởi động lại.\n=== Quản Lý Hoạt Động ===\n[6] Kiểm tra cập nhật.\n[7] Lấy danh sách người dùng bị cấm.\n[8] Lấy danh sách nhóm bị cấm.\n[9] Gửi thông báo tới tất cả các nhóm.\n[10]. Tìm kiếm UID thông qua tên người dùng\n[11]. Tìm kiếm TID thông qua tên Box\n\n-> Để chọn, hãy reply tin nhắn này với số <-", n.threadID, ((e, a) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: a.messageID,
			author: n.senderID,
			type: "choose"
		})
	}), n.messageID)
}, module.exports.handleReply = async function({
	api: e,
	event: n,
	client: a,
	handleReply: s,
	Currencies: t,
	Users: r,
	Threads: o
}) {
	const {
		userName: i
	} = global.data, {
		writeFileSync: g,
		readFileSync: h
	} = global.nodemodule["fs-extra"], d = [];
	switch (l = 1, s.type) {
		case "choose":
			switch (n.body) {
				case "1":
					return e.sendMessage("Prefix của bot là : " + global.config.PREFIX, n.threadID, n.messageID);
				case "2":
					return e.sendMessage("Tên của bot là : " + global.config.BOTNAME, n.threadID, n.messageID);
				case "3": {
					const a = global.config.ADMINBOT || config.ADMINBOT || [];
					var c = [];
					for (const e of a)
						if (parseInt(e)) {
							const n = i.get(e) || await r.getNameUser(e);
							c.push(`${n} - ${e}`)
						} return e.sendMessage(`[Admin] Danh sách toàn bộ người điều hành bot: \n\n${c.join("\n")}`, n.threadID, n.messageID)
				}
				case "4":
					if ("vi" == global.config.language) return e.sendMessage("Ngôn ngữ: Tiếng Việt", n.threadID, n.messageID);
					"en" == global.config.language && e.sendMessage("Language : English", n.threadID, n.messageID);
					break;
				case "5":
					return e.sendMessage("Bot sẽ khởi động lại vào lúc 12h", n.threadID, n.messageID);
				case "6":
					return e.sendMessage("Hiện tại bot đang ở phiên bản : " + global.config.version, n.threadID, n.messageID);
				case "7": {
					const a = global.data.userBanned.keys();
					for (const e of a) {
						const n = global.data.userName.get(e) || await r.getNameUser(e);
						d.push(`${l++}. ${n} \nUID: ${e}`)
					}
					return e.sendMessage(`Hiện tại đang có ${d.length} người dùng bị ban\n\n${d.join("\n")}\n\n`, n.threadID)
				}
				case "8": {
					const a = global.data.threadBanned.keys();
					for (const s of a) return nameT = await global.data.threadInfo.get(s).threadName || "Tên không tồn tại", d.push(`${l++}. ${nameT}\nTID: ${s}`), e.sendMessage(`Hiện tại đang có ${d.length} nhóm bị ban\n\n${d.join("\n")}\n\n`, n.threadID)
				}
				break;
			case "9":
				return e.sendMessage("Reply tin nhắn này để nhập tin nhắn muốn gửi đến các nhóm", n.threadID, ((e, a) => {
					global.client.handleReply.push({
						name: this.config.name,
						messageID: a.messageID,
						author: n.senderID,
						type: "sendnoti"
					})
				}), n.messageID);
			case "10":
				return e.sendMessage("Reply tin nhắn này để nhập tên người dùng", n.threadID, ((e, a) => {
					global.client.handleReply.push({
						name: this.config.name,
						messageID: a.messageID,
						author: n.senderID,
						type: "getuid"
					})
				}), n.messageID);
			case "11":
				return e.sendMessage("Reply tin nhắn này để nhập tên box", n.threadID, ((e, a) => {
					global.client.handleReply.push({
						name: this.config.name,
						messageID: a.messageID,
						author: n.senderID,
						type: "gettidbox"
					})
				}), n.messageID)
			}
			break;
		case "sendnoti": {
			var m = global.data.allThreadID || [];
			let a = await r.getNameUser(n.senderID);
			var u = 1,
				I = [];
			for (const s of m) isNaN(parseInt(s)) || s == n.threadID || (e.sendMessage(`Thông báo từ admin ${a} \n\n` + n.body, s, ((e, n) => {
				e && I.push(s)
			})), u++, await new Promise((e => setTimeout(e, 500))));
			return e.sendMessage(`Gửi thành công tới : ${u} nhóm\n\nThất bại ${I.length} nhóm`, n.threadID, n.messageID)
		}
		case "getuid":
			e.getUserID(`${n.body}`, ((a, s) => {
        var c = [];
				for (var t in s) c += `Tên : ${s[t].name}\nUID : ${s[t].userID}\n\n`;
				return e.sendMessage(c, n.threadID)
			}));
			break;
		case "gettidbox":
			try {
				const a = n.body || "",
					s = (await o.getAll(["threadID", "threadInfo"])).filter((e => !!e.threadInfo));
				var D = [],
					b = "",
					p = 0;
				s.forEach((e => {
					(e.threadInfo.threadName || "").toLowerCase().includes(a.toLowerCase()) && D.push({
						name: e.threadInfo.threadName,
						id: e.threadID
					})
				})), D.forEach((e => b += `\n${p+=1}. ${e.name} - ${e.id}`)), D.length > 0 ? e.sendMessage(`Kết quả của tìm kiếm : ${b}`, n.threadID) : e.sendMessage("Đéo tìm thấy", n.threadID, n.messageID)
			} catch (a) {
				return e.sendMessage(a, n.threadID)
			}
	}
};