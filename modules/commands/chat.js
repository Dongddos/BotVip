module.exports.config = {
	name: "chat",
	version: "0.0.2",
	hasPermssion: 2,
	credits: "Quốc Anh",
	description: "Gửi tin nhắn riêng tới nhóm hoặc người dùng. (Lệnh admin)",
	commandCategory: "Admin",
	usages: "[u/t] [uid/tid]",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, utils }) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    var msg = args.splice(2).join(" ");
    if (args[0]=='u') {
        return api.sendMessage(`𝑻𝑰𝑵 𝑵𝑯𝑨̆́𝑵 𝑻𝑼̛̀ 𝑨𝑫𝑴𝑰𝑵 𝑮𝑼̛̉𝑰 Đ𝑬̂́𝑵 𝑩𝑨̣𝑵\nNội dung: ` + msg, args[1]).then( 
            api.sendMessage('Đã gửi tin nhắn đến thành viên ' + args[1] + '!', event.threadID, event.messageID));
    } else {
            if (args[0]=='t') { return api.sendMessage(`Vào lúc: ${gio}\n𝑻𝑰𝑵 𝑵𝑯𝑨̆́𝑵 𝑹𝑰𝑬̂𝑵𝑮 𝑻𝑼̛̀ 𝑨𝑫𝑴𝑰𝑵 Đ𝑬̂́𝑵 𝑵𝑯𝑶́𝑴 𝑩𝑨̣𝑵\nNội dung: ` + msg, args[1]).then(
            api.sendMessage('Đã gửi tin nhắn đến nhóm ' + args[1] + '!', event.threadID, event.messageID))
            }
                else return utils.throwError("sendmsg", event.threadID, event.messageID);
        }
    }