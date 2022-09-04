module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVong & Nguyên ngu",
  description: "như cc",
  commandCategory: "noprefix",
  cooldowns: 0
}

module.exports.handleEvent = async function ({ api, event }) { 
	if (!event.body) return;
	if (event.messageReply) { 
		if (event.messageReply.senderID != api.getCurrentUserID()) return;
	}
	let s = event.body.toLowerCase();
	let x = s.indexOf('bot');
	if (x < 0) return;
	let c = s.startsWith('bot');
	if (c == true) { 
		const axios = require('axios');
		let s = (await axios.get('https://api.simsimi.net/v2/?text=' + encodeURIComponent(event.body) + '&lc=vn')).data;
		return api.sendMessage(s.success, event.threadID, (err, info) => {
			global.client.handleReply.push({
				name: this.config.name,
				messageID: info.messageID
			});
		}, event.messageID);
	}
}
module.exports.handleReply = async function ({ api, event, handleReply }) { 
	const axios = require('axios');
	let c = (await axios.get('https://api.simsimi.net/v2/?text=' + encodeURIComponent(event.body) + '&lc=vn')).data;
	return api.sendMessage(c.success, event.threadID, (err, info) => { 
		global.client.handleReply.push({ 
			name: this.config.name,
			messageID: info.messageID
        })
	}, event.messageID);
}
module.exports.run = async function({ api, event, args }) { 
	const { threadID, messageID, senderID } = event;
	const out = (msg) => api.sendMessage(msg, threadID, messageID);
	return out('Modules này là noprefix');
}
