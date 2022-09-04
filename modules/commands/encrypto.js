
module.exports.config = {
    name: "encrypto",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "BraSL",
    description: "enc",
    commandCategory: "system",
    usages: "",
    cooldowns: 0
  };
module.exports.run = async function({ api, event ,args}) {
const crypto = require('crypto');
const aes = require("aes-js");
  const CryptoJS = require("crypto-js");
  var fs = require('fs-extra'),{ join } = require('path');
  const axios = require("axios");
  const chalk = require('chalk');
  
 // const data = require('./../../data.json');
   const dataa = require('./../../dataa.json');

  const dataEncryp = (await axios.get('https://run.mocky.io/v3/2bf077e0-03cb-4c1b-a18f-92a51559f003')).data
  switch (args[0]) {
    case "enc": {
var salt = CryptoJS.lib.WordArray.random(128 / 8);
      var key512Bits = CryptoJS.PBKDF2("CoCaiConCacNekChuDecode", salt, {
  keySize: 512 / 32
});
      
       //var key = CryptoJS.enc.Hex.parse("CoCaiConCacNekChuDecode") 

      const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || event.messageReply.body
     var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), `${key512Bits}`).toString();
    ////  var en = CryptoJS.SHA512(ciphertext);
  

 var FileFastConfig = require(join(process.cwd(), 'data.json'));
            FileFastConfig = String(ciphertext);
            fs.writeFileSync(join(process.cwd(), 'data.json'), JSON.stringify(FileFastConfig, null, 4));
      
       console.log(chalk.bold.hex("#FF0000")(`${ciphertext}`) )//+ "\n\n" + en);
     return api.sendMessage(`${ciphertext}`, event.threadID, event.messageID)
     
  }
      
    case "dec": {

     /* var salt = CryptoJS.lib.WordArray.random(128 / 8);
      var key512Bits = CryptoJS.PBKDF2("CoCaiConCacNekChuDecode", salt, {
  keySize: 512 / 32
});

    //const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || event.messageReply.body
 //Decrypt
var bytes  = CryptoJS.AES.decrypt(dataEncryp, '230405');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      
      console.log(chalk.bold.hex("#FF0000")(`${decryptedData}`));
     return api.sendMessage(JSON.stringify(decryptedData,null,"\t"), event.threadID)// [{id: 1}, {id: 2}]

      
var FileFastConfigs = require(join(process.cwd(), 'dataa.json'));
            FileFastConfigs = String(decryptedData);
            fs.writeFileSync(join(process.cwd(), 'dataa.json'), JSON.stringify(FileFastConfigs, null, 4));*/
    
    const dataEncryp = (await axios.get('https://run.mocky.io/v3/2bf077e0-03cb-4c1b-a18f-92a51559f003')).data
var bytes  = CryptoJS.AES.decrypt(dataEncryp, '230405');
var lengthchar = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(lengthchar)
  var FileFastConfig = require(join(process.cwd(), 'data.json'));
            FileFastConfig = lengthchar
            fs.writeFileSync(join(process.cwd(), 'data.json'), JSON.stringify(FileFastConfig, null, 4));
    
    }
 }
}