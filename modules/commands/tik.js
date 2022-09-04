  
module.exports.config = {
    name: "tik",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "BraSL",
    description: "Thông tin video tiktok",
    commandCategory: "Nhóm",
    usages: "link",
    cooldowns: 0
};
module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');  
 const fs = require('fs-extra');
  try { 
  if (!args.join("") != " " ){ return api.sendMessage("Bạn phải nhập id tiktok !!!", event.threadID, event.messageID);}
var link = args[0];
    
        const info = (await axios.get(`https://lightblueornatedevice.hanakuhshsjsjshejsna.repl.co/tiktok/get?link=${link}`))//.data.data
      var name = info.data.data.author.nickname
      var id = info.data.data.author.unique_id

      var nameMusic = info.data.data.music_info.title
      var author = info.data.data.music_info.author
  
      var title = info.data.data.title
      var img = info.data.data.cover
      var view = info.data.data.play_count
      var tim = info.data.data.digg_count
      var comment = info.data.data.comment_count
      var share = info.data.data.share_count
      var DL = info.data.data.download_count
        var path = __dirname + "/cache/1.png";
    let getimg = (await axios.get(`${img}`, { responseType: 'arraybuffer' })).data.data;
  fs.writeFileSync(path, Buffer.from(getimg, "utf-8"));
     
    var body = `---- INFO USER TIKTOK ---\n👀Tên:${name}\n🪧ID:${id}\n---- INFO VIDEO ---- \n✅Title: ${title}\n❌VIEW: ${view}\n💗Số lượt tym: ${tim}\n🖥Comment: ${comment} \n🦈Share: ${share}\n⬇️Lượt tải: ${DL}\n---- INFO MUSIC ----\nAuthor: ${author}\nTên nhạc: ${nameMusic}`
return api.sendMessage({body: body, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, event.messageID);
  } catch(e) {
    console.log(e)
    return api.sendMessage(e, event.threadID)
  }
}
