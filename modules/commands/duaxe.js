const fs = require('fs');
const axios = require('axios');
module.exports.config = {
	name: "duaxe", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "TruongMini", // Công nh��n module sở hữu là ai
	description: "đua xe gobrrrr", // Thông tin chi tiết về lệnh
	commandCategory: "MiniGame", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	envConfig: {
		key: "Nghia9005",
	} 
};

module.exports.languages = {
	"vi": {
		"carHelp": "=====『 GAME ĐUA XE 』=====\n\n♚─────────♔─────────────♚\n==『 HƯỚNG ĐÃ SỬ DỤNG 』==\n\n» Duaxe info / xem thông tin xe của bạn\n» Duaxe shop / shop mua xe\n» Duaxe create [ số tiền cược ] / để đua xe\n» Duaxe update / nâng cấp xe\n» Duaxe top / xem top server ",
		"noBets": "Bạn chưa nhập tiền đặt cược",
		"fail": "Chỉ chọn %1 -> %2",
		"shopCar": "=====『 SHOP CAR 』=====\n\n──────────────\n➴『 1.』 Kawasaki-Z1000 \n» Giá: %1 đô\n➴『 2.』 Ducati-Monster-795  \n» Giá: %1 đô\n➴『 3.』 Aprilia-RSV4  \n»  Giá: %1 đô\n➴『 4.』 Yamaha-YZF-R1  \n» Giá: %1 đô\n➴『 5.』 CBR-650R  \n» Giá: %1 đô\n\n->Reply tin nhắn này để mua xe!",
		"notEnoughMoney": "Bạn không đủ tiền để mua xe này!",
		"alreadyBuy": "Bạn đã mua xe này rồi!",
		"buySuccess": "=====『 Chúc Mừng 』=====\nBạn đã mua thành công xe %1 với giá %2$",
		"userCar": "=======『 Kho Xe 』=======\n%1\nReply tin nhắn này để xem thông tin xe của bạn",
		"carInfo": "===『 %1 』===\n» Tốc độ: %2\n» Máy xe cấp: %3\n» Lọc nhớt cấp: %4\n» Bugi cấp: %5\n» Lọc gió cấp: %6",
		"noCar": "Bạn chưa sở hữu xe nào!",
		"updateHelp": "Bạn hiện có %1 xe:\n%2\nVui lòng sử dụng %3%4 update + <số xe> + <số linh kiện> để nâng cấp xe!",
		"updateSuccess": "Chúc mừng bạn đã nâng cấp phụ kiện thành công!",
		"updateFail": "Nâng cấp không thành công! chúc bạn may mắn lần sau",
		"waitUpdate": "Đang tiến hành nâng cấp, vui lòng đợi",
		"notEnoughMoneyToUpdate": "Bạn cần %1$ để nâng cấp xe!",
		"havingRace": "Đang có 1 cuộc đua được diễn ra ở nhóm",
		"notEnoughBetMoney": "Bạn không đủ tiền để đặt cược!",
		"betsLow": "Bạn phải đặt cược t���i thiểu là 1000$",
		"createSuccess": "Tạo thành công cuộc đua xe với mức cược là %1\nĐể tham gia sử dụng %2%3 join",
		"chooseCar": "Reply tin nhắn này để chọn xe!\n%1",
		"noRace": "Không có cuộc đua nào được tạo ra ở nhóm!",
		"notCar": "Bạn không có xe nào để tham gia cuộc đua!",
		"joinSuccess": "Bạn đã tham gia cuộc đua xe thành công!\nSố người tham gia hiện tại là %1/5",
		"alreadyJoin": "Bạn đã tham gia cuộc đua xe rồi!",
		"notEnoughUser": "Cần ít nhất 2 người để tham gia cuộc đua xe!",
		"notRoomMaster": "Bạn không phải chủ phòng?",
		"error": "Vui lòng nhập đúng định dạng!",
		"outOfUses": "Key hiện tại của bạn đã hết lượt dùng\nVui long liên hệ 1st để nhận key mới nhé",
		"maxLevel": "Phụ kiện này của bạn đã đạt level tối đa",
		"topUser": "Top 5 những người thắng nhiều nhất server\n%1\nReply tin nhắn này để xem thông tin chi tiết",
		"topUserInfo": "===[ %1 ]===\nXe mạnh nhất là:\nName: %2\nTốc độ: %3\nMáy xe cấp: %4\nLọc nhớt cấp: %5\nBugi cấp: %6\nLọc gió cấp: %7",
	}
}

const car = ["Kawasaki-Z1000", "Ducati-Monster-795", "Aprilia-RSV4", "Yamaha-YZF-R1", "CBR-650R"]; 
const carGif = [
	"https://i.ibb.co/d2nctPy/kawasaki.gif",
	"https://i.ibb.co/TMBJbs9/ducati.gif",
	"https://i.ibb.co/687r0Kr/aprillia.gif",
	"https://i.ibb.co/FBBwpvC/yamaha.gif",
	"https://i.ibb.co/JQGK6BG/cbr.gif"
]
const carImg = [
	"https://i.ibb.co/vck4KrF/kawasaki.jpg",
	"https://i.ibb.co/0fg3YFR/ducati.jpg",
	"https://i.ibb.co/J7t80r5/aprillia.jpg",
	"https://i.ibb.co/zX0b5Bs/yamaha.jpg",
	"https://i.ibb.co/F5KpcKv/cbr.jpg"
]

module.exports.handleReply = async ({ api, event, handleReply, Currencies, getText, Users }) => {
	const { key } = global.configModule[this.config.name];
	const { threadID, messageID, senderID, body } = event;
    const { increaseMoney, decreaseMoney, getData } = Currencies;
	if(!global.client.duaxe) global.client.duaxe = {};
	if(handleReply.author != senderID) return;
	const input = parseInt(event.body.trim());
	//GET PREFIX
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	let pathData = __dirname + '/cache/dataCar.json';
	if(!fs.existsSync(pathData)) fs.writeFileSync(pathData, JSON.stringify({}))
	let data = JSON.parse(fs.readFileSync(pathData));
	const send = async (msg) => new Promise(resolve => api.sendMessage(msg, threadID, (err, info) => resolve(info), messageID));
	let moneyUser = (await getData(senderID)).money;
	switch(handleReply.type) {
		case "Shop": {
			if(moneyUser < handleReply.price) return send(getText("notEnoughMoney"));
			if(input < 1 || input > 5) return send(getText("fail", 1, 5));
			if(data[senderID].car.find(e => e.name == car[input - 1])) return send(getText("alreadyBuy"));
			data[senderID].car.push({machXe: 1, locNhot: 1, bugi: 1, locGio: 1, name: car[input - 1], speed: 100 })
			fs.writeFileSync(pathData, JSON.stringify(data, null, 4));
			await decreaseMoney(senderID, handleReply.price);
			api.unsendMessage(handleReply.messageID);
			return send({
				body: `${getText("buySuccess", car[input - 1], handleReply.price)}`,
				attachment: (await axios.get(carGif[input - 1], { responseType: 'stream' }).catch(e => console.log(e))).data
			});
		}
		case "Info": {
			if(input < 1 || input > handleReply.e - 1) return send(getText("fail"), 1, handleReply.e);
			let carUser = data[senderID].car[input - 1];
			let carName = carUser.name;
			let carSpeed = carUser.speed;
			let carMachXe = carUser.machXe;
			let carLocNhot = carUser.locNhot;
			let carBugi = carUser.bugi;
			let carLocGio = carUser.locGio;
      let img = carImg[car.indexOf(carName)];
			api.unsendMessage(handleReply.messageID);
			return send({
				body: `${getText("carInfo", carName, carSpeed, carMachXe, carLocNhot, carBugi, carLocGio)}`,
				attachment: (await axios.get(img, { responseType: 'stream' }).catch(e => console.log(e))).data
			});
		}
		case "chooseCar": {
			if(input < 1 || input > handleReply.e - 1) return send(getText("fail", 1, handleReply.e));
			let carUser = data[senderID].car[input - 1];
			global.client.duaxe[threadID].data.push(senderID)
			global.client.duaxe[threadID].car.push({ user: senderID, nameCar: carUser.name, speed: carUser.speed });
			api.unsendMessage(handleReply.messageID);
			return send(getText("joinSuccess", global.client.duaxe[threadID].car.length));
		}
		case "topUser": {
			if(input < 1 || input > 5) return send(getText("fail", 1, 5));
			let topUserCar = data[handleReply.top[input - 1].user].car[0];
			let name = await Users.getNameUser(handleReply.top[input - 1].user);
			api.unsendMessage(handleReply.messageID);
			return send(getText("topUserInfo", name, topUserCar.name, topUserCar.speed, topUserCar.machXe, topUserCar.locNhot, topUserCar.bugi, topUserCar.locGio));
		}
    }
}

module.exports.run = async ({ api, event, args, Users, Currencies, getText }) => {
	const { key } = global.configModule[this.config.name];
    const { threadID, messageID, senderID, body } = event;
    const { increaseMoney, decreaseMoney, getData } = Currencies;
	if(!global.client.duaxe) global.client.duaxe = {};
	//GET PREFIX
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	let pathData = __dirname + '/cache/dataCar.json';
	if(!fs.existsSync(pathData)) fs.writeFileSync(pathData, JSON.stringify({}))
	let data = JSON.parse(fs.readFileSync(pathData));
	const send = async (msg) => new Promise(resolve => api.sendMessage(msg, threadID, (err, info) => resolve(info), messageID));
	let moneyUser = (await getData(senderID)).money;
	if(!data[senderID]) data[senderID] = { car: [], cup: 0 };
	fs.writeFileSync(pathData, JSON.stringify(data, null, 4));
	switch (args[0]) {
		case "-s":
		case "shop": {
			let priceOfCar = 1000;
			return send({
				body: `${getText("shopCar", [priceOfCar])}`,
				attachment: (await axios.get('https://i.ibb.co/Mp2WcYR/275901698-2186025798224187-8150991327502390234-n.jpg', { responseType: 'stream' }).catch(e => console.log(e))).data
			}).then((info) => {
				global.client.handleReply.push({
					type: "Shop",
					name: this.config.name,
					messageID: info.messageID,
					author: senderID,
					price: priceOfCar
				})
			});
		}
		case "-u":
		case "update": {
			if(data[senderID].car.length == 0) return send(getText("noCar"));
			if(!args[1]) {
				let msg = "";
				let e = 1;
				for(let i in data[senderID].car) {
					msg += `${e}. ${data[senderID].car[i].name}\n`;
					e++;
				}
				return send(getText("updateHelp", data[senderID].car.length, msg, prefix, this.config.name));
			} else if(args[1] && args[2]) {
				if(args[1] < 1 || args[1] > data[senderID].car.length) send(getText("error")); // xe
				if(args[2] < 1 || args[2] > 4) send(getText("error")); // phu kien
				let oneTimeUpdate = 500;
				if(moneyUser < oneTimeUpdate) return send(getText("notEnoughMoneyToUpdate", oneTimeUpdate));
				let accessory = ["machXe", "locNhot", "bugi", "locGio"];
				let carUser = data[senderID].car[args[1] - 1];
				let level = Object.values(carUser);
				if(level[args[2] - 1] == 5) return send(getText("maxLevel"));
				let api = `${level[args[2] - 1]}_${args[2]}`;
				console.log(api)
				await decreaseMoney(senderID, oneTimeUpdate);
				send(getText("waitUpdate"));
				const res = (await axios.get(`https://api-duaxe.nhatngu123.repl.co/update/${api}_${key}`).catch(e => console.log(e))).data;
				if(res.output == "outOfUses") return send(getText("outOfUses"));
				if(res.output) {
					let newLevel = data[senderID].car[args[1] - 1][accessory[args[2] - 1]] + 1;
					data[senderID].car[args[1] - 1][accessory[args[2] - 1]] = newLevel;
					let newSpeed = data[senderID].car[args[1] - 1]["speed"] + res.count;
					data[senderID].car[args[1] - 1]["speed"] = newSpeed;
					fs.writeFileSync(pathData, JSON.stringify(data, null, 4));
					return send({
						body: `${getText("updateSuccess")}`,
						attachment: (await axios.get(res.url, { responseType: 'stream' }).catch(e => console.log(e))).data
					});
				} else {
					return send({
						body: `${getText("updateFail")}`,
						attachment: (await axios.get(res.url, { responseType: 'stream' }).catch(e => console.log(e))).data
					});
				}
			}
		}
		case "-i":
		case "info": {
			if(data[senderID].car.length == 0) return send(getText("noCar"));
			let msg = "";
			let e = 1;
			for(let i in data[senderID].car) {
				msg += `${e}. ${data[senderID].car[i].name}\n`;
				e++;
			}
			return send(getText("userCar", msg)).then((info) => {
				global.client.handleReply.push({
					type: "Info",
					name: this.config.name,
					messageID: info.messageID,
					count: e,
					author: senderID
				})
			});
		}
		case "-c":
		case "create": {
			if(threadID in global.client.duaxe) return send(getText("havingRace"));
			if(!args[1]) return send(getText("noBets"));
			if(data[senderID].car.length == 0) return send(getText("noCar"));
			let moneyBet = parseInt(args[1]);
			if(moneyBet < 1000) return send(getText("betsLow"));
			if(moneyUser < moneyBet) return send(getText("notEnoughBetMoney"));
			await decreaseMoney(senderID, moneyBet);
			let carUser = "";
			let e = 0;
			for(let i of data[senderID].car) {
				carUser += `${e + 1}. ${i.name}, Vận tốc: ${i.speed}\n`;
				e++;
			}
			global.client.duaxe[threadID] = {
				data: [],
				car: [],
				author: senderID,
				money: moneyBet
			}
			return send(getText("chooseCar", carUser)).then((info) => {
				global.client.handleReply.push({
					type: "chooseCar",
					name: this.config.name,
					messageID: info.messageID,
					count: e,
					author: senderID
				});
			})
		}
		case "join": {
			if(!global.client.duaxe[threadID]) return send(getText("noRace"));
			if(data[senderID].car.length == 0) return send(getText("notCar"));
			let moneyBet = global.client.duaxe[threadID].money;
			if(moneyUser < moneyBet) return send(getText("notEnoughBetMoney"));
			if(senderID in global.client.duaxe[threadID].data) return send(getText("alreadyJoin"));
			global.client.duaxe[threadID].data.push(senderID);
			await decreaseMoney(senderID, moneyBet);
			let carUser = "";
			let e = 0;
			for(let i of data[senderID].car) {
				carUser += `${e + 1}. ${i.name}, Vận tốc: ${i.speed}\n`;
				e++;
			}
			return send(getText("chooseCar", carUser)).then((info) => {
				global.client.handleReply.push({
					type: "chooseCar",
					name: this.config.name,
					messageID: info.messageID,
					count: e,
					author: senderID
				})
			})
		}
		case "start": {
			if(!global.client.duaxe[threadID]) return send(getText("noRace"));
			if(global.client.duaxe[threadID].data.length < 2) return send(getText("notEnoughUser"));
			if(senderID != global.client.duaxe[threadID].author) return send(getText("notRoomMaster"));
			let userPlay = global.client.duaxe[threadID].car;
			let msg = `${userPlay[0].user}:${userPlay[0].speed}`;
			for(let i = 1; i < userPlay.length; i++) {
				msg += `_${userPlay[i].user}:${userPlay[i].speed}`;
			}
			let res = (await axios.get(`https://api-duaxe.nhatngu123.repl.co/duaxe/${msg}_${key}`).catch(e => { return api.sendMessage("Đã có lỗi sảy ra"), threadID, () => console.log(e) })).data;
			if(res.output == "outOfUses") {
				send(getText("outOfUses"));
				return delete global.client.duaxe[threadID];
			} 
			api.sendMessage("Đang bắt đầu cuộc đua vui lòng đơi giây lát...", threadID);
			api.sendMessage({
				attachment: (await axios.get(res.gif, { responseType: 'stream' }).catch(e => console.log(e))).data
			}, threadID);
			setTimeout(async () => {
				let userWin = res.output.split("_");
				await increaseMoney(userWin[0], global.client.duaxe[threadID].money * 2);
				await increaseMoney(userWin[1], global.client.duaxe[threadID].money);
				let cup = data[userWin[0]].cup;
				data[userWin[0]].cup = cup + 1;
        let name = await Users.getNameUser(userWin[0])
				fs.writeFileSync(pathData, JSON.stringify(data, null, 4));
				let result = `====『 Kết quả cuộc đua 』====\n\n──────────────\n===『 Danh sách cuộc đua 』===\nTop 1: ${name} \nNhận được ${global.client.duaxe[threadID].money * 2} đô \n\n`;
				let e = 1;
				for(let i = 1; i < userWin.length; i++) {
					name = await Users.getNameUser(userWin[i])
					result += `『${e + 1}』. ${name}\nBị trừ ${global.client.duaxe[threadID].money} đô\n`;
					e++;
				}
				result += "──────────────";
				api.sendMessage(result, threadID);
				return delete global.client.duaxe[threadID];
			}, 10000);
			break;
		}
		case "top": {
			let topUser = [];
			for(let i in data) {
				topUser.push({
					user: i,
					cup: data[i].cup,
					car: data[i].car.length
				})
			}
			topUser.sort((a, b) => { return b.cup - a.cup })
			let result = "";
			let e = 0;
			for(let i of topUser) {
				let name = await Users.getNameUser(i.user);
				result += `${e + 1}. ${name}\n  Có ${i.cup} trận thắng\n  Sở hữu ${i.car} xe\n`;
				e++;
				if(e == 5) break;
			}
			return send(getText("topUser", result)).then((info) => {
				global.client.handleReply.push({
					type: "topUser",
					name: this.config.name,
					messageID: info.messageID,
					author: senderID,
					top: topUser
				})
			});
		}
		default: {
        const picture = (await axios.get(`https://imgur.com/F7AjPwe.jpg`, { responseType: "stream"})).data
      return api.sendMessage({body: "===『 GAME ĐUA XE 』===\n\n♚────────♔──────────♚\n» Duaxe info / xem thông tin xe \n» Duaxe shop / shop mua xe\n» Duaxe create / dua xe\n» Duaxe update / nâng cấp xe\n» Duaxe top / xem top server ",attachment: (picture)
     
    }, threadID, messageID);
		}
	}
}