module.exports.config = {
    name: "pending",
    version: "1.0.6",
    credits: "CatalizCS mod by Kadeer",
    hasPermssion: 2,
    description: "Quản lý tin nhắn chờ của bot",
    commandCategory: "Hệ thống admin-bot",
    cooldowns: 5
};

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
        	api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[singleIndex - 1].threadID);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
        }
        return api.sendMessage(`Đã từ chối thành công!`, threadID, messageID);
    }
    else {

        const index = body.split(/\s+/);
        const fs = require("fs");       
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by Kadeer" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage({body:`》 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝 《\n𝑩𝒐𝒕 𝒊𝒔 𝒐𝒑𝒆𝒓𝒂𝒕𝒊𝒏𝒈 𝒃𝒚 𝑲𝒂𝒅𝒆𝒆𝒓\n𝐂𝐨𝐧𝐭𝐚𝐜𝐭: https://www.facebook.com/BrokenCandy05 or 𝒁𝒂𝒍𝒐: 0976890935, 𝑪𝒉𝒖́𝒄 𝒄𝒂́𝒄 𝒃𝒂̣𝒏 𝒕𝒓𝒂̉𝒊 𝒏𝒈𝒉𝒊𝒆̣̂𝒎 𝒃𝒐𝒕 𝒗𝒖𝒊 𝒗𝒆̉ 𝒗𝒂̀ 𝒌𝒉𝒐̂𝒏𝒈 𝒔𝒑𝒂𝒎, 𝒑𝒉𝒂́ 𝒃𝒐𝒕 𝒅𝒖̛𝒐̛́𝒊 𝒎𝒐̣𝒊 𝒉𝒊̀𝒏𝒉 𝒕𝒉𝒖̛́𝒄\n 𝑴𝑨̃𝑰 𝑰𝑼 𝑼𝑾𝑼🐧❤`, attachment: fs.createReadStream(__dirname + "/cache/pending/pending.mp4")} ,handleReply.pending[singleIndex - 1].threadID));
            count+=1;
            
        }
        return api.sendMessage(`Đã phê duyệt thành công!`, threadID, messageID);
    }
}

module.exports.run = async function({ api, event, args, permission, handleReply }) {
        if (args.join() == "") {api.sendMessage("Bạn có thể dùng pending\nUser: Hàng chờ người dùng\nThread: Hàng chờ nhóm\nAll:Tất cả hàng chờ ",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "User": {
    const permission = ["100006622276498"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Không thể lấy danh sách đang chờ!", threadID, messageID) }

      const list = [...spam, ...pending].filter(group => group.isGroup == false);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`»「PENDING」«\n❯ Tổng số người dùng cần duyệt: ${list.length} người dùng ❮\n⥥⥥⥥ Reply số thư tự bên dưới để duyệt ⥥⥥⥥\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("»「PENDING」«\n❯ Hiện tại không có người dùng nào trong hàng chờ ❮", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "Thread": {
        const permission = ["100006622276498"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Không thể lấy danh sách đang chờ!", threadID, messageID) }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`»「PENDING」«\n❯ Tổng số nhóm cần duyệt: ${list.length} nhóm ❮\n⥥⥥⥥ Reply số thư tự bên dưới để duyệt ⥥⥥⥥\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("»「PENDING」«\n❯ Hiện tại không có nhóm nào trong hàng chờ ❮", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "al": {
        const permission = ["100006622276498"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Không thể lấy danh sách đang chờ!", threadID, messageID) }

            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`»「PENDING」«\n❯ Tổng số User và Thread cần duyệt: ${list.length} User và Thread ❮\n⥥⥥⥥ Reply số thư tự bên dưới để duyệt ⥥⥥⥥\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("»「PENDING」«\n❯ Hiện tại không có User và Thread nào trong hàng chờ ❮", threadID, messageID);
        }
    }       
}