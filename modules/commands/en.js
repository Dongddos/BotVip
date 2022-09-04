
module.exports.config = {
    name: "en",
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
  const { getRandomBytesSync } = require("ethereum-cryptography/random");
  const secp = require("ethereum-cryptography/secp256k1");
  
  const data = require('./../../data.json');
   const dataa = require('./../../dataa.json');

  switch (args[0]) {
    case "enc": {
    var jj = getRandomBytesSync(32)
    var encryptedHex = aes.utils.hex.fromBytes(jj);
console.log(chalk.bold.hex("#FF00FF")(`${encryptedHex}`));
      
      // console.log(chalk.bold.hex("#FF0000")(`${ciphertext}`));
      
     return api.sendMessage(encryptedHex, event.threadID, event.messageID)
     
  }
      
    case "dec": {
      
     // console.log(chalk.bold.hex("#FF0000")(`${decryptedData}`));
    // return api.sendMessage(JSON.stringify(decryptedData,null,"\t"), event.threadID)// [{id: 1}, {id: 2}]


    }
 }
}  