module.exports.config = {
	name: "\n",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "ManhG",
	description: "bài thơ",
	commandCategory: "Horoscope",
	usages: "thathinh",
	cooldowns: 0
};

module.exports.run = async ({ api, event }) => {
const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const res = await axios.get("https://chinle-api.herokuapp.com/poem");
    var poem = res.data.data;

    axios.get('https://apid.chinhle4447.repl.co/images/girl').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `${poem}`,
						attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
			})
}