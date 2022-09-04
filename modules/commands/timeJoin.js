module.exports.config = {
    name: "timeJoin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nam",
    description: "Xem thời gian vào nhóm",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 5,
};
const fs = require("fs");
var timeJoin = __dirname + "/cache/timeJoin.json";
module.exports.handleEvent = async function({ event }) {
 const { threadID, senderID, body } = event
 const {readFileSync, writeFileSync  } = fs
 const { parse, stringify } = JSON;
    var get = require("moment-timezone").tz("Asia/Ho_Chi_Minh"),
        gio = get.format("HH:mm:ss"),
        ngay = get.format("YYYY-MM-D"),
        burh = get.format("D/MM/YYYY");
    let timejoinn = parse(readFileSync(timeJoin));
    if (!timejoinn[senderID + threadID]) {
        timejoinn[senderID + threadID] = {
            uid: senderID,
            gio: gio,
            ngay: ngay,
            burh: burh
        };
        writeFileSync(timeJoin, stringify(timejoinn));
    }
};
module.exports.run = async function({ api, event, args, Users, Threads
}) {
    const { threadID,  messageID, senderID } = event
    const credit = this.config.credits
    const { readFileSync, existsSync, writeFileSync } = fs
    const { parse, stringify } = JSON;
    
    if ('Nam' != credit) return;
    if (!existsSync(timeJoin)) writeFileSync(timeJoin, stringify({}));
    let ThreadInfo = await api.getThreadInfo(threadID),
        ThreadNames = ThreadInfo.threadName,
        aimabit = parse(readFileSync(timeJoin)),
        timeN = aimabit[senderID + threadID].ngay,
        timeG = aimabit[senderID + threadID].gio;
    var gn1 = new Date(`${timeN} ${timeG}`),
        gn2 = new Date(),
        gn3 = gn1.getTime(),
        gn4 = gn2.getTime(),
        get_Ngay = Math.ceil((gn4 - gn3) / (24 * 60 * 60 * 1000)),
        get_Tuan = Math.ceil((gn4 - gn3) / (7 * 24 * 60 * 60 * 1000)) - 1,
        get_Thang = Math.ceil((gn4 - gn3) / (31 * 24 * 60 * 60 * 1000)) - 1,
        get_Gio = Math.ceil((gn4 - gn3) / (60 * 60 * 1000)),
        get_Phut = Math.ceil((gn4 - gn3) / (60 * 1000)),
        get_Giay = Math.ceil((gn4 - gn3) / (1000));
   if (get_Ngay == 0) return api.sendMessage(`Chỉ bắt đầu tính sau 1 ngày khi Bot vào nhóm`, threadID, messageID);
    api.sendMessage(`◆━━━━━━━━━━━◆\n[ ${ThreadNames} ]\n\n Bạn đã gia nhập nhóm vào lúc:\n\n[ ${aimabit[senderID+threadID].gio} ] ngày [ ${aimabit[senderID+threadID].burh} ]\n\n━━━━━━━━━━━━━━\n\n→ Số ngày đã qua: ${get_Ngay} ngày\n→ Số tuần đã qua: ${get_Tuan} tuần\n→ Số tháng đã qua ${get_Thang} tháng\n→ Số giờ đã qua: ${get_Gio} giờ\n→ Số phút đã qua: ${get_Phut} phút\n→ Số giây đã qua: ${get_Giay} giây`, threadID, messageID);
}