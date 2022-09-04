module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname", "log:thread-call","log:thread-icon", "log:thread-color","change_thread_image"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads }) { 
     const { threadID, logMessageType, logMessageData } = event;
   const fs = require('fs-extra')//,{ join } = require('path');
  const request = require("request")
    const { messageID, author } = event;
    const { setData, getData } = Threads;
    let dataThread = await getData(threadID);
    let oldName = dataThread.threadInfo.threadName
  let avtBox = dataThread.threadInfo.imageSrc
	const dataNameBox = require('./../../modules/events/cache/nameBox.json');
  const dataNameUser = require('./../../modules/events/cache/nickname.json');
  const dataAvt = require('./../../modules/events/cache/avtBox.json');
	
	var iconPath = __dirname + "/emoji.json";
	if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));


    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
			case "change_thread_image": {
        //let avt = JSON.parse(fs.readFileSync(dataAvt));
              dataThread.imageSrc = avtBox;
               if(dataAvt.AvtBox.hasOwnProperty(threadID) && dataAvt.AvtBox[threadID] == false || (await api.getThreadInfo(threadID)).adminIDs.some(i => i.id == author) || (author == api.getCurrentUserID())){
                setData(threadID, {imageSrc: avtBox});
                return api.sendMessage(`[BraSL] ${event.snippet}`, threadID);
            } else {
                api.sendMessage("Bạn không có quyền thay đổi ảnh nhóm!", threadID,messageID);
                var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), threadID, () => fs.unlinkSync(__dirname + "/cache/1.png") ,messageID);
    return request(encodeURI(`${avtBox}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
            }
             break; 
            }
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[BraSL] Đã cập nhật người dùng ${logMessageData.TARGET_ID} trở thành quản trị viên nhóm`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[BraSL] Đã cập nhật người dùng ${logMessageData.TARGET_ID} trở thành thành viên`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:user-nickname": {
         //typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && 
              var name = global.data.userName.get(logMessageData.participant_id)
              if(!dataThread.adminIDs.some(item => item.id == event.author) || (author == api.getCurrentUserID()) && dataNameUser.NickName.hasOwnProperty(threadID) && dataNameUser.NickName[threadID] == false) {
                api.sendMessage(`[BraSL] Đã cập nhật biệt danh của người dùng ${name} thành: ${(logMessageData.nickname.length == 0) ? "tên gốc": logMessageData.nickname}`, threadID);
             
      } else {
                api.sendMessage(  '[!] Hiện tại nhóm này cấm thành viên thay đổi biệt danh [!]', threadID )
                  api.changeNickname( logMessageData.nickname, threadID, logMessageData.participant_id)
             
                }
                break;
            }

           case "log:thread-name": {
           
              dataThread.threadName = event.logMessageData.name || "Không tên";
               if(dataNameBox.NameBox.hasOwnProperty(threadID) 
                  && dataNameBox.NameBox[threadID] == false || (await api.getThreadInfo(threadID)).adminIDs.some(i => i.id == author) || (author == api.getCurrentUserID())) {
                setData(threadID, {name: logMessageData.name});
                return api.sendMessage(`[BraSL] ▻  Cập nhật tên box thành công`, threadID);
            } else {
                api.sendMessage("Bạn không có quyền thay đổi tên nhóm!", threadID);
                api.setTitle(oldName, threadID);
            }
             break; 
            }
            case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[BraSL] CẬP NHẬT NHÓM [BraSL]\n»  ${event.logMessageBody.replace("biểu tượng cảm xúc", "icon")}\n» Icon gốc: ${preIcon[threadID] || "không rõ"}`, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
               }

            case "log:thread-call": {
              console.log(2)
                if (logMessageData.event == "group_call_started") {
                    const name = (await Users.getData(event.author));
                    api.sendMessage(`[BraSL] GROUP UPDATE [BraSL]\n» ${name} STARTED A ${(logMessageData.video) ? 'VIDEO ' : ''}CALL.`, threadID);
                }
                else if (logMessageData.event == "group_call_ended") {
                    const callDuration = logMessageData.call_duration;

                    //Transform seconds to hours, minutes and seconds
                    let hours = Math.floor(callDuration / 3600);
                    let minutes = Math.floor((callDuration - (hours * 3600)) / 60);
                    let seconds = callDuration - (hours * 3600) - (minutes * 60);

                    //Add 0 if less than 10
                    if (hours < 10) hours = "0" + hours;
                    if (minutes < 10) minutes = "0" + minutes;
                    if (seconds < 10) seconds = "0" + seconds;

                    const timeFormat = `${hours}:${minutes}:${seconds}`;

                    api.sendMessage(`[BraSL] GROUP UPDATE [BraSL]\n» ${(logMessageData.video) ? 'VIDEO ' : ''}CALL HAS ENDED.\n» CALL DURATION: ${timeFormat}`, threadID);
                    
                }
                else if (logMessageData.joining_user) {
                    const name = await Users.getNameUser(logMessageData.joining_user);
                    api.sendMessage(`[BraSL] GROUP UPDATE [BraSL]\n» ${name} JOINED THE ${(logMessageData.group_call_type == '1') ? 'VIDEO ' : ''}CALL.`, threadID);
                }
                break;
            }
             case "log:thread-color": {
            	dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[BraSL] CẬP NHẬT NHÓM [BraSL]\n»  ${event.logMessageBody.replace("Chủ đề", "color")}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e);
                 api.sendMessage(e , threadID) 
                };
}