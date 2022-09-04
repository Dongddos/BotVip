module.exports.config = {
    name: "deletemessage",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "HĐGN",
    description: "Xóa tin nhắn các nhóm",
    commandCategory: "Xóa Tin Nhắn NHóm",
    cooldowns: 0
}

module.exports.run = async function ({ event, api }) {
  api.sendMessage("Tiến hành xóa tin nhắn...",event.threadID, () => api.deleteThread(event.threadID) )
}