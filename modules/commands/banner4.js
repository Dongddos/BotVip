const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
const thiccysapi = require('@phaticusthiccy/open-apis'); 
module.exports.config = {
    name: "banner4",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "BraSL",
    description: "banner",
    commandCategory: "game",
    usages: "",
    cooldowns: 5
  };


module.exports.run = async function({ api, event,args }) {
  switch (args[0]) {
  case "1": {
const text1 = args[1] || "Developer"
// Some Examples
var text = [JSON.stringify(text1)]
thiccysapi.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
     text1 , ["lechinh"]
    ).then(async (data) => { 
	let callback = function () {
				return api.sendMessage({ body: `ảnh của bạn đây`,
						attachment: fs.createReadStream(__dirname + `/cache/1.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/1.jpg`), event.messageID);
				};
				request(data).pipe(fs.createWriteStream(__dirname + `/cache/1.jpg`)).on("close", callback);
      
});
  }
      break;
  case "2":{
    const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "Developer"
    const text2 = args[2] || "Phaticusthiccy"
// Some Examples

thiccysapi.textpro("https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html",
     text1 , text2
    ).then(async (data) => { 
	let callback = function () {
				return api.sendMessage({ body: `ảnh của bạn đây`,
						attachment: fs.createReadStream(__dirname + `/cache/1.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/1.jpg`), event.messageID);
				};
				request(data).pipe(fs.createWriteStream(__dirname + `/cache/1.jpg`)).on("close", callback);
      
});
  }
        break;
     case "3":{
    const text1 = args[1] || "Developer"
    const text2 = args[2] || "Phaticusthiccy"
// Some Examples

thiccysapi.textpro("https://textpro.me/neon-text-effect-online-879.html",
     text1 , text2
    ).then(async (data) => { 
  //console.log(data)
	let callback = function () {
    
				return api.sendMessage({ body: `ảnh của bạn đây`,
						attachment: fs.createReadStream(__dirname + `/cache/1.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/1.jpg`), event.messageID);
				};
				request(data).pipe(fs.createWriteStream(__dirname + `/cache/1.jpg`)).on("close", callback);
   
});
  }
        break;
}
  
}