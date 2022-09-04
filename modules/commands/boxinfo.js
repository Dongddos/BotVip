const fs = require("fs");
const request = require("request");
module.exports.config = {
	name: "boxinfo",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "HungCatMoi",
	description: "Xem thông tin box của bạn",
	commandCategory: "Box", 
	usages: "boxinfo", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args, Threads  }) {

  let threadInfo = await api.getThreadInfo(event.threadID);
     //var namethread = datathread.name;
	//let threadInfo = (await Threads.getData(event.threadID));
	//var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
     	var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
	var nam = gendernam.length;
    var nu = gendernu.length;
	let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;

    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `•` + name + '\n';
    }
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
	let sex = threadInfo.approvalMode;
			var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';
			var callback = () =>
				api.sendMessage(
					{
						body: `✨Tên: ${threadName}\n🤖 ID Box: ${id}\n👀 Phê duyệt: ${pd}\n🧠 Emoji: ${icon}\n👉 Thông tin: gồm ${threadMem} thành viên\nSố tv nam 👦: ${nam} thành viên\nSố tv nữ 👩‍🦰: ${nu} thành viên\nVới ${qtv} quản trị viên \n\n${listad}\n🕵️‍♀️ Tổng số tin nhắn: ${sl} tin.\n 📩fb.me/100012371343281`,
						attachment: fs.createReadStream(__dirname + '/cache/1.png')
					},
					event.threadID,
					() => fs.unlinkSync(__dirname + '/cache/1.png'),
					event.messageID
				);
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
	    }