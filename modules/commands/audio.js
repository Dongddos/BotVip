module.exports.config = {
	name: "audio",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "bhhoang || Yuu Adagaki || Nanika",
	description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
	commandCategory: "Youtube",
	usages: "[link or content need search]",
	cooldowns: 10,
	dependencies: {
		"ytdl-core": "",
    "youtube-search-without-api-key": "",
    "fs-extra": "",
    "axios": "",
    "@ffmpeg-installer/ffmpeg": "",
    "fluent-ffmpeg": ""
	},
};

module.exports.languages = {
	"vi": {
		"overSizeAllow": "Không thể gửi file vì dung lượng lớn hơn 25MB, tiến hành giảm chất lượng và gửi lại. Quá trình này có thể tốn vài phút",
		"returnError": "Đã xảy ra vấn đề khi đang xử lý request, lỗi: %1",
		"cantProcess": "Không thể xử lý yêu cầu của bạn!",
		"missingInput": "Phần tìm kiếm không được để trống!",
		"returnList": "🎼 Có %1 kết quả trùng với từ khoá tìm kiếm của bạn: \n%2\nHãy reply(phản hồi) chọn một trong những tìm kiếm trên"
	},
	"en": {
		"overSizeAllow": "Can't send fine because it's bigger than 25MB, reducing quality and resending. This will take several minutes",
		"returnError": "Have some problem when handling request, error: %1",
		"cantProcess": "Can't handle your request!",
		"missingInput": "Search section must not be blank!",
		"returnList": "🎼 Have %1 results with your imput: \n%2\nPlease reply choose 1 of these result"
	}
}

module.exports.handleReply = async function({ api, event, handleReply }) {
	const ytdl = global.nodemodule["ytdl-core"];
  const ffmpegPath = global.nodemodule["@ffmpeg-installer/ffmpeg"].path;
  const ffmpeg = global.nodemodule["fluent-ffmpeg"];
  ffmpeg.setFfmpegPath(ffmpegPath);
	const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];
  const fs = global.nodemodule["fs-extra"];
	try {
		ytdl(handleReply.link[event.body - 1],{ filter: 'audioonly', quality:`lowestaudio` })
			.pipe(createWriteStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`))
			.on("close", () => {
				//if (statSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`).size > 26214400) return api.sendMessage(getText("overSizeAllow"), event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`), event.messageID);
          if (statSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`).size > 26214400){
            api.sendMessage("Không thể gửi file vì dung lượng lớn hơn 25MB, tiến hành giảm chất lượng và gửi lại. Quá trình này có thể tốn vài phút", event.threadID, event.messageID);
            ffmpeg(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`).audioBitrate('32k').output(__dirname + `/cache/${handleReply.link[event.body - 1]}(1).m4a`).on('end',()=>{
              fs.unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`)
              return api.sendMessage({attachment: createReadStream(__dirname + `/cache/${handleReply.link[event.body - 1]}(1).m4a`)}, event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}(1).m4a`), event.messageID)
            }).run();
          }
				else return api.sendMessage({attachment: createReadStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`)}, event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`), event.messageID)
			})
			.on("error", (error) => api.sendMessage(getText("returnError", error), event.threadID, event.messageID));
	}
	catch { api.sendMessage(getText("cantProcess"), event.threadID, event.messageID) }
	return api.unsendMessage(handleReply.messageID);
}

module.exports.run = async function({ api, event, args, getText }) {
	const ytdl = global.nodemodule["ytdl-core"];
  const yt = global.nodemodule["youtube-search-without-api-key"]
	const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];
  if (global.client.audio == true) return api.sendMessage("Hệ thống đang xử lý yêu cầu từ box khác, vui lòng quay lại sau", event.threadID, event.messageID);
        global.client.audio = true;
	if (args.length == 0 || !args) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	const keywordSearch = args.join(" ");
	const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
	const urlValid = videoPattern.test(args[0]);
	
	if (urlValid) {
		try {
      const ffmpegPath = global.nodemodule["@ffmpeg-installer/ffmpeg"].path;
      const ffmpeg = global.nodemodule["fluent-ffmpeg"];
      ffmpeg.setFfmpegPath(ffmpegPath);
      const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];
      const fs = global.nodemodule["fs-extra"];
			var id = args[0].split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            (id[2] !== undefined) ? id = id[2].split(/[^0-9a-z_\-]/i)[0] : id = id[0];
			ytdl(args[0],{ filter: 'audioonly', quality:`lowestaudio` })
				.pipe(createWriteStream(__dirname + `/cache/${id}.m4a`))
				.on("close", () => {
					//if (statSync(__dirname + `/cache/${id}.m4a`).size > 26214400) return api.sendMessage(getText("overSizeAllow"), event.threadID, () => unlinkSync(__dirname + `/cache/${id}.m4a`), event.messageID);
          if (statSync(__dirname + `/cache/${id}.m4a`).size > 26214400){
            api.sendMessage(getText("overSizeAllow"), event.threadID, event.messageID);
            ffmpeg(__dirname + `/cache/${id}.m4a`).audioBitrate('32k').output(__dirname + `/cache/${id}(1).m4a`).on('end',()=>{
              fs.unlinkSync(__dirname + `/cache/${id}.m4a`)
              return api.sendMessage({attachment: createReadStream(__dirname + `/cache/${id}(1).m4a`)}, event.threadID, () => unlinkSync(__dirname + `/cache/${id}(1).m4a`), event.messageID)
            }).run();
          }
					else return api.sendMessage({attachment: createReadStream(__dirname + `/cache/${id}.m4a`)}, event.threadID, () => unlinkSync(__dirname + `/cache/${id}.m4a`) , event.messageID)
				})
				.on("error", (error) => api.sendMessage(getText("returnError", error), event.threadID, event.messageID));
		}
		catch { return api.sendMessage(getText("cantProcess"), event.threadID, event.messageID) }
	}
	else {
    try {
      const fs = global.nodemodule["fs-extra"];
      const axios = global.nodemodule["axios"];
      const ytdl = global.nodemodule["ytdl-core"];
      var link = [],
        msg = "",
        num = 1;
      var thumbs = [];
      let results = (await yt.search(keywordSearch)).slice(0,6)
      for (const value of results) {
        if (typeof value.id.videoId !== "undefined") {
          link.push(value.id.videoId);
          let video = (await ytdl.getBasicInfo(value.id.videoId))
          msg += `${num}. ${value.title}\nThời lượng: ${value.duration_raw}\nTên kênh: ${video.videoDetails.ownerChannelName}\n\n`;
          let gT = (
            await axios.get(
              `https://i.ytimg.com/vi/${value.id.videoId}/0.jpg`,
              { responseType: "arraybuffer" }
            )
          ).data;
                 fs.writeFileSync(__dirname + `/cache/${num}.png`,Buffer.from(gT))
               }
  
          thumbs.push(fs.createReadStream(__dirname + `/cache/${num++}.png`));
        }
      return api.sendMessage(
        {
          attachment: thumbs,
          body: getText("returnList", link.length, msg),
        },
        event.threadID,
        (error, info) => 
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            link,
          }),
        event.messageID
      );
    } 
   catch (error) { return api.sendMessage(getText("returnError", JSON.stringify(error)), event.threadID, event.messageID) }
  }
};