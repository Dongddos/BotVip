module.exports.config = {
	name: "checktt",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SenProject",
	description: "check tương tác",
	commandCategory: "Tiện ích",
	usages: "checktt",
	cooldowns: 5,
	dependencies: {
		"fs-extra": ""
	}
}

const path = __dirname + '/count-by-thread/';
//{}const path = __dirname + '/checktt/';

module.exports.onLoad = () => {
    const fs = require('fs');
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
    }
}

module.exports.handleEvent = function ({ event, Users , api  }) {
    const { messageID, threadID, senderID } = event;
    if (!global.data.allThreadID.some(tid => tid == threadID)) return;
  
    const fs = global.nodemodule['fs'];
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
  var count = 0
   var name = global.data.userName.get(senderID)
    if (!getThreadJSON.hasOwnProperty(senderID)) {
      
        getThreadJSON[senderID] = {
          name: name,
          Tin_Nhan: count
        }
    }
    getThreadJSON[senderID]++;
    fs.writeFileSync(threadPath, JSON.stringify(getThreadJSON, null, 4));
}


 const getRankName = count => {
    return count > 50000 ? 'Chiến tướng'
    :count > 9000 ? 'Cao Thủ'
        : count > 8000 ? 'Tinh Anh V'
            : count > 6100 ? 'Tinh Anh IV'
                : count > 5900? 'Tinh Anh III'
                    : count > 5700 ? 'Tinh Anh II'
                        : count > 5200 ? 'Tinh Anh I'
                            : count > 5000 ? 'Kim Cương V'
                                : count > 4800 ? 'Kim Cương IV'
                                    : count > 4500 ? 'Kim Cương III'
                                        : count > 4000 ? 'Kim Cương II'
                                            : count > 3800 ? 'Kim Cương I'
                                                : count > 3500 ? 'Bạch Kim IV'
                                                    : count > 3200 ? 'Bạch Kim III'
                                                        : count > 3000 ? 'Bạch Kim II'
                                                            : count > 2900 ? 'Bạch Kim I'
                                                                : count > 2500 ? 'Vàng IV'
                                                                    : count > 2300 ? 'Vàng III'
                                                                        : count > 2000 ? 'Vàng II'
                                                                            : count > 1500 ? 'Vàng I'
                                                                                : count > 1200 ? 'Bạc III'
                                                                                    : count > 1000 ? 'Bạc II'
                                                                                        : count > 900 ? 'Bạc I'
                                                                                            : count > 500 ? 'Đồng III'
                                                                                                : count > 100 ? 'Đồng II'
                                                                                                    : 'Đồng I'
}



module.exports.run = async function ({ api, event, args, Users }) {
  const request = global.nodemodule["request"];
  const axios = global.nodemodule['axios']
    const fs = global.nodemodule['fs'];
    const { messageID, threadID, senderID, mentions , type , messageReply} = event;
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const query = args[0] ? args[0].toLowerCase() : '';
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
  var count = 1
  var names = global.data.userName.get(senderID)
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = {
          name: names,
          Tin_Nhan: count
        }
    }
    var storage = [],
        msg = '';
   /* if (query == 'all') {
        const allThread = await api.getThreadInfo(threadID) || { participantIDs: [] };
        for (id of allThread.participantIDs) {
            if (!getThreadJSON.hasOwnProperty(id)) {
                getThreadJSON[id] = 0;
            }
        }
    }*/
    for (const id in getThreadJSON) {
 // if(getThreadJSON){
    //var id = getThreadJSON
      
        const name = global.data.userName.get(id)
     // var name = (await api.getUserInfoV2(id)).name
        storage.push({ id, name, count: getThreadJSON[id] });
    }
   /* storage.sort((a, b) => {
        if (a.count > b.count) return -1;
        else if (a.count < b.count) return 1;
        else return a.name.localeCompare(b.name);
    });*/
    if (query == 'all') {
        let count = 1;
        msg += '===CHECKTT===';
        for (const user of storage) {
            msg += `\n${count++}. ${user.name} - ${user.count}`;
        }
    } else if (query == 'locmem') {
      let count = 0, count1 = 0;
      let input = parseInt(args[1]);
for (const user of storage) {
  try {
			if(user.count <= input ) {
       await api.removeUserFromGroup(user.id, threadID);
				count++;
        
			}
		} catch(e) { count1++ }
          //${user.count}
        }
      if(count == 0) return api.sendMessage("Không có ai để xóa", threadID);
	if(count != 0) msg += `Đã xoá ${count} người dùng ít hơn ${input} tin nhắn khỏi nhóm.\n`;
	if(count1 != 0) msg += `Không thể xóa ${count1} người dùng`;
	return api.sendMessage(msg, threadID);
    
    } else if (query == 'rank') {
        msg += 'Đồng 1 (10tin nhắn)\nĐồng 2 (100tin nhắn)\nĐồng 3 (500tin nhắn)\nBạc 1 (900 tin nhắn)\nBạc 2 (1000 tin nhắn)\nBạc 3 (1200 tin nhắn)\nVàng 1 (1500 tin nhắn)\nVàng2 (2000 tin nhắn)\nVàng3 (2300 tin nhắn)\nVàng 4 (2500 tin nhắn)\nBạch kim 1 (2900 tin nhắn)\nBạch kim  2 (3000 tin nhắn)\nBạch kim 3 (3200 tin nhắn)\nBạch kim 4 (3500 tin nhắn)\nKim cương 1(3800 tin nhắn)\nKim cương 2 (4000 tin nhắn)\nKim cương 3 (4500 tin nhắn)\nKim cương 4(4800 tin nhắn)\nKim cương 5 (5000 tin nhắn)\nTinh Anh 1 (5200 tin nhắn)\nTinh Anh 2 (5700 tin nhắn)\nTinh Anh 3 (5900 tin nhắn)\nTinh anh 4 (6100 tin nhắn)\nTinh Anh 5 (8000 tin nhắn)\nCao thủ (9000 tin nhắn)\nChiến tướng (50000 tin nhắn)'
    } else if (!query) {
        let userID = senderID;
        if (type == 'message_reply') {
        targetID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
        targetID = Object.keys(mentions)[0];
    }
        const rankUser = storage.findIndex(e => e.id == userID);
      
        msg += `${userID == senderID ? '💠Bạn' : storage[rankUser].name} đứng thứ ${rankUser + 1}\n💌Số tin nhắn: ${storage[rankUser].count}\n🔰Rank ${getRankName(storage[rankUser].count)}`;
    }
    api.sendMessage(msg, threadID);
    return;
}
//storage[rankUser].name