module.exports = function ({ api, models }) {
  const fs = require("fs");
  const Users = require("./controllers/users")({ models, api }),
    Threads = require("./controllers/threads")({ models, api }),
    Currencies = require("./controllers/currencies")({ models });
  const logger = require("../utils/log.js");

  //////////////////////////////////////////////////////////////////////
  //========= Push all variable from database to environment =========//
  //////////////////////////////////////////////////////////////////////

  (async function () {

    try {
      logger(global.getText('listen', 'startLoadEnvironment'), '[ DATABASE ]');
      let threads = await Threads.getAll(),
        users = await Users.getAll(['userID', 'name', 'data']),
        currencies = await Currencies.getAll(['userID']);
      for (const data of threads) {
        const idThread = String(data.threadID);
        global.data.allThreadID.push(idThread),
          global.data.threadData.set(idThread, data['data'] || {}),
          global.data.threadInfo.set(idThread, data.threadInfo || {});
        if (data['data'] && data['data']['banned'] == !![])
          global.data.threadBanned.set(idThread,
            {
              'reason': data['data']['reason'] || '',
              'dateAdded': data['data']['dateAdded'] || ''
            });
        if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0)
          global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
        if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
      }
      logger.loader(global.getText('listen', 'loadedEnvironmentThread'));
      for (const dataU of users) {
        const idUsers = String(dataU['userID']);
        global.data['allUserID']['push'](idUsers);
        if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
        if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
          'reason': dataU['data']['reason'] || '',
          'dateAdded': dataU['data']['dateAdded'] || ''
        });
        if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0)
          global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
      }
      for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
      logger.loader(global.getText('listen', 'loadedEnvironmentUser')), logger(global.getText('listen', 'successLoadEnvironment'), '[ DATABASE ]');
    } catch (error) {
      return logger.loader(global.getText('listen', 'failLoadEnvironment', error), 'error');
    }
  }());
  logger(`${api.getCurrentUserID()} - [ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Mirai pr0ject" : global.config.BOTNAME}`, "[ BOT INFO ]");

  ///////////////////////////////////////////////
  //========= Require all handle need =========//
  //////////////////////////////////////////////

  const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
  const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
  const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
  const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
  const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
  const handleCreateDatabase = require("./handle/handleCreateDatabase")({ api, Threads, Users, Currencies, models });

  logger.loader(`====== ${Date.now() - global.client.timeStart}ms ======`);

  //////////////////////////////////////////////////
  //========= Send event to handle need =========//
  /////////////////////////////////////////////////

  return (event) => {
    if (event.type == "change_thread_image") api.sendMessage(`» [ CẬP NHẬT NHÓM ] ${event.snippet}`, event.threadID);
    let data = JSON.parse(fs.readFileSync(__dirname + "/../modules/commands/cache/approvedThreads.json"));
    let adminBot = global.config.ADMINBOT;
    if (!data.includes(event.threadID) && !adminBot.includes(event.senderID)) {
      //getPrefix
      const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
      const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

      //check body
      if (event.body && event.body == `${prefix}request`) {
        adminBot.forEach(e => {
          api.sendMessage(`Box ${event.threadID} đã yêu cầu được duyêt!`, e);
        })
        return api.sendMessage(`Đã gửi yêu cầu đến (các) admin bot!`, event.threadID);
      }
      if (event.body && event.body.startsWith(prefix)) return api.sendMessage(`Box của bạn chưa được duyệt, để gửi yêu cầu duyệt, dùng:\n${prefix}request`, event.threadID);
    };
    let unsend = __dirname + "/../modules/commands/cache/unsendReaction.json"; 		if (!fs.existsSync(unsend)) fs.writeFileSync(unsend, JSON.stringify({}, null, 4)); 		let unsendData = JSON.parse(fs.readFileSync(unsend)); 		if(!unsendData[event.threadID]) unsendData[event.threadID] = { data: false }; 		fs.writeFileSync(unsend, JSON.stringify(unsendData, null, 4)); 		if(event.type == "message_reaction" && event.senderID == api.getCurrentUserID() && unsendData[event.threadID].data) api.unsendMessage(event.messageID);
    switch (event.type) {
      case "message":
      case "message_reply":
      case "message_unsend":
        handleCreateDatabase({ event });
        handleCommand({ event });
        handleReply({ event });
        handleCommandEvent({ event });

        break;
      case "event":
        handleEvent({ event });
        break;
      case "message_reaction":
        handleReaction({ event });
        break;
      default:
        break;
    }
  };
};

//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯S MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯