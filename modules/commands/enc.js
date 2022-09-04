
module.exports.config = {
    name: "enc",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "BraSL",
    description: "enc",
    commandCategory: "system",
    usages: "",
    cooldowns: 5
  };
module.exports.run = async function({ api, event ,args}) {
const crypto = require('crypto');
const aes = require("aes-js");
  const CryptoJS = require("crypto-js");
  var fs = require('fs-extra'),{ join } = require('path');
  const axios = require("axios");
  const chalk = require('chalk');
  
  const data = require('./../../data.json');
   const dataa = require('./../../dataa.json');

  
  switch (args[0]) {
    case "enc": {
      const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || event.messageReply.body
      
      var key = "ChoBoMayXinCaiTuoiDecrypLuon"
    let hashEngine = crypto.createHash("sha256");
    let hashKey = hashEngine.update(key).digest();
    let bytes = aes.utils.utf8.toBytes(text);
    let aesCtr = new aes.ModeOfOperation.ctr(hashKey);
    let encryptedData = aesCtr.encrypt(bytes);
    var encryptedDatas = aes.utils.hex.fromBytes(encryptedData)
      var encryptedHex = aes.utils.hex.fromBytes(hashKey);

//var buffer = Buffer.from(plaintext);
      
      console.log(chalk.bold.hex("#eec344")(`${encryptedDatas} \n -------------------------------------------------------\n ${JSON.stringify(hashKey)}`))
     return api.sendMessage(encryptedDatas// + `-------------------------\n${JSON.stringify(hashKey)}`
                            , event.threadID, event.messageID)
  }
      
    case "dec": {
const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || event.messageReply.body
      var key = "ChoBoMayXinCaiTuoiDecrypLuon"
      let hashEngine = crypto.createHash("sha256");
    let hashKey = hashEngine.update(key).digest();

    let encryptedBytes = aes.utils.hex.toBytes(text);
    let aesCtr = new aes.ModeOfOperation.ctr(hashKey);
    let decryptedData = aesCtr.decrypt(encryptedBytes);

    var decryptedDatas = aes.utils.utf8.fromBytes(decryptedData);
      
       console.log(chalk.bold.hex("#eec34f")(`${decryptedDatas}`))
     return api.sendMessage(`${decryptedDatas}`, event.threadID, event.messageID)
      
    }
 }
}