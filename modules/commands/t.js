module.exports.config = {
    name: "t",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Raiku",
    description: "abcxyz",
    commandCategory: "Tạo ảnh",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, client, args }) { 
  const fs = require("fs-extra");
const request = require("request");
   if (event.type !== "message_reply") return api.sendMessage("Bạn phải phản hồi một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("Bạn phải phản hồi một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng phản hồi chỉ một audio, video, ảnh`, event.threadID, event.messageID);
    var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
        
}