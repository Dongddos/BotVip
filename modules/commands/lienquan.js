module.exports.config = {
    name: "lienquan",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "san",
    description: "Không có gì cả",
    commandCategory: "Edit-img",
    usages: "[tag]",
    cooldowns: 5
};
module.exports.run = async function ({api, event, args})  {
  const axios = require('axios');
  const fs = require("fs-extra");
  if (args[0] == "skill") {
    try {  
      let res = (await  axios.get(encodeURI(`https://ginxkin-api.glitch.me/api/lienquan/`+ args.join(" ").slice(6)))).data;
      let skill0_img = (await axios.get(res.skill0_img, { responseType: "arraybuffer" })).data;
      fs.writeFileSync( __dirname + "/cache/skill0_img.png", Buffer.from(skill0_img, "utf-8"));    
      let skill1_img = (await axios.get(res.skill1_img, { responseType: "arraybuffer" })).data;
      fs.writeFileSync( __dirname + "/cache/skill1_img.png", Buffer.from(skill1_img, "utf-8"));  
      let skill2_img = (await axios.get(res.skill2_img, { responseType: "arraybuffer" })).data;
      fs.writeFileSync( __dirname + "/cache/skill2_img.png", Buffer.from(skill2_img, "utf-8"));  
      let skill3_img = (await axios.get(res.skill3_img, { responseType: "arraybuffer" })).data;
      fs.writeFileSync( __dirname + "/cache/skill3_img.png", Buffer.from(skill3_img, "utf-8"));  
      setTimeout(() => {
        api.sendMessage({body:`Tên: ${res.name}\nLoại: ${res.role}\nSố skin: ${res.skins}`+`\n\n===Chiêu thức===\nNội tại: ${res.skill0}`,attachment: fs.createReadStream(__dirname + `/cache/skill0_img.png`)}, event.threadID,()=> fs.unlinkSync(__dirname + `/cache/skill0_img.png`), event.messageID);
                },500)
      setTimeout(() => { 
        api.sendMessage({body:`\nChiêu 1: ${res.skill1}`,attachment: fs.createReadStream(__dirname + `/cache/skill1_img.png`)}, event.threadID,()=> fs.unlinkSync(__dirname + `/cache/skill1_img.png`));
                },1000)
      setTimeout(() => { 
        api.sendMessage({body:`\nChiêu 2: ${res.skill2}`,attachment: fs.createReadStream(__dirname + `/cache/skill2_img.png`)}, event.threadID,()=> fs.unlinkSync(__dirname + `/cache/skill2_img.png`));
                },1500)
      setTimeout(() => { 
        api.sendMessage({body:`\nChiêu 3: ${res.skill3}`,attachment: fs.createReadStream(__dirname + `/cache/skill3_img.png`)}, event.threadID,()=> fs.unlinkSync(__dirname + `/cache/skill3_img.png`));
                },2000) 
      return;
    } catch (err) {
      return api.sendMessage("Không tìm thấy tướng!",event.threadID)
  }
  }
  else {  
    try {  
    let res = (await    axios.get(encodeURI(`https://ginxkin-api.glitch.me/api/lienquan/`+ args.join(" ")))).data;
    let avatar = (await axios.get(res.avatar, { responseType: "arraybuffer" })).data;
    fs.writeFileSync( __dirname + "/cache/avatar_lq.png", Buffer.from(avatar, "utf-8"));

    api.sendMessage({body:`Tên: ${res.name}\nLoại: ${res.role}\nSố skin: ${res.skins}\n\n===Thông số (lv1 -> lv15)===\nCông vật lý ${res.stats.atk}\nCông phép ${res.stats.mtk}\nMáu ${res.stats.hp}\nGiáp ${res.stats.def}\nGiáp phép ${res.stats.mdef}\nTốc đánh ${res.stats.asd}\nGiảm hồi chiêu ${res.stats.cd}\nTỉ lệ chí mạng ${res.stats.crit_rate}\nTốc chạy ${res.stats.spd}\nHồi máu/5s ${res.stats.heal}\nHồi năng lượng/5s ${res.stats.mheal}\nTầm đánh ${res.stats.range}`,attachment: fs.createReadStream(__dirname + `/cache/avatar_lq.png`)}, event.threadID, event.messageID);
    return fs.unlinkSync(__dirname + `/cache/avatar_lq.png`);
    } catch (err) {
      return api.sendMessage("Không tìm thấy tướng!",event.threadID)
    }
  }
                                                                                                                                                                  }