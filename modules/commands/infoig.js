module.exports.config = {

	name: "infoig",

	version: "1.0.0",

	hasPermssion: 0,

	credits: "tdunguwu",

	description: "",

	commandCategory: "Thông tin",

	usages: "",

	cooldowns: 5,
	dependencies: {"request" : ""}




	

};



module.exports.run = async ({ api, event,args }) => {

const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
let user = args.join(" ");

const res = await axios.get(`https://api.popcat.xyz/instagram?user=${user}`);

var usn = res.data.username;

var fnm = res.data.full_name;

var bio = res.data.biography;

var pst = res.data.posts;

var rel = res.data.reels;

var fle = res.data.followers;

var flw = res.data.following;

var prt = res.data.private;

var vr = res.data.verified;

var img = res.data.profile_pic;

if (!user) return api.sendMessage("địt mẹ chưa nhập nội dung để coi kìa ", event.threadID, event.messageID);



var callback = () => api.sendMessage({body:`=> ID: ${usn}\n=> Tên đầy đủ: ${fnm}\n=> Tiểu Sử:${bio}\n=> Bài Viết: ${pst}\n=> Thước Phim${rel}\n=> Người Theo Dõi: ${fle}\n=> Đang Theo Dõi: ${flw}\n=> Khóa Trang: ${prt}\n=> Xác Thực: ${vr} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);

  return request(`${res.data.profile_pic}`).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());     

}