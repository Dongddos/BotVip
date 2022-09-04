const chalk = require('chalk');
module.exports.config = {
    name: "thamgia",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Henry",
    description: "Tham gia vào các box Bot đang ở",
    commandCategory: "Dành cho người dùng",
    usages: "",
    cooldowns: 5
};
 module.exports.onLoad = () => {
  console.log(chalk.bold.hex("# 00c300").bold("============ SUCCESFULLY LOADED THE JOIN COMMAND ============"));
  }
module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('Lựa chọn của bạn phải là một số.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("Lựa chọn của bạn không nằm trong danh sách", threadID, messageID);
  try {
    var threadInfo = await Threads.getInfo(ID[body - 1]);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;
    if (participantIDs.includes(senderID)) return api.sendMessage(`Bạn đã có mặt trong nhóm này rồi.`, threadID, messageID);
    api.addUserToGroup(senderID, ID[body - 1]);
    if (approvalMode == true && !adminIDs.some(item => item.id) == api.getCurrentUserID()) return api.sendMessage("Đã thêm bạn vào danh sách phê duyệt của nhóm... tự custom đi", threadID, messageID);
    else return api.sendMessage(`Em đã thêm anh vào nhóm ${threadInfo.threadName} rồi nha.Kiểm tra ở mục spam hoặc tin nhắn chờ nếu không thấy box nha.`, threadID, messageID);
  } catch (error) {
    return api.sendMessage(`Em bị lỗi nên không thêm anh vào nhóm đó được :<.\n\n${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `Đây là các box bạn có thể tham gia:\n\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `${number}. ${i.threadInfo.threadName}\n`;
    ID.push(i.threadID)
  }
  msg += `\nTrả lời tin nhắn này kèm số tương ứng với nhóm mà bạn muốn vào.`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
     messageID: info.messageID,
      ID: ID      
    })
  }, messageID)
    }