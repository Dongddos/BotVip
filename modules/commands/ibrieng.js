module.exports.config = {
  name: "ibrieng",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "BraSL",
  description: "bùm",
  commandCategory: ":V",
  usages: "",
  cooldowns: 5
};
module.exports.run = async function ({ api, event, client, args, permssion }) {
const axios = require("axios");
  const { writeFileSync } = require("fs-extra")
  var { threadID, messageID } = event;
  const { configPath } = global.client;
  delete require.cache[require.resolve(configPath)];
  var config = require(configPath);
if (!args[0]) {
    if (config.ibrieng == false) {
      config.ibrieng = true;
      api.sendMessage("» Bật thành công ib riêng với bot", threadID, messageID);
    } else {
      config.ibrieng = false;
      api.sendMessage("» Tắt thành công ib riêng với bot", threadID, messageID);
    }
    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
  }
}