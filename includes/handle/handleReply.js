module.exports = function ({ api, models, Users, Threads, Currencies }) {
    return function ({ event }) {
        if (!event.messageReply) return;
        const { handleReply, commands } = global.client
        const { messageID, threadID, messageReply } = event;
        if (handleReply.length !== 0) {
          (async() => {
	const findLangIndex = handleReply.findIndex(e => e.messageID == messageReply.messageID);
	if (findLangIndex < 0) return;
	if (handleReply[findLangIndex].name == 'langChoose_0x01042022') {
		if (!handleReply[findLangIndex].adminIDs.some(e => e.id == event.senderID)) return;
		const threadData = await Threads.getData(threadID) || {};
		if (!threadData.hasOwnProperty('data')) threadData.data = {};
		if (!threadData.data.hasOwnProperty('lang')) threadData.data.lang = "";
		if (event.body == "1") {
			threadData.data.lang = "vi"
		} else if (event.body == "2") {
			threadData.data.lang = "en"
		} else return;

		await Threads.setData(threadID, { data: threadData.data });
		global.data.threadData.set(threadID, threadData.data);
		msg = event.body == 1 ? 'Bạn đã chọn ngôn ngữ Việt.' : 'You have choosen English.';
		return api.sendMessage(msg, threadID, () => global.client.handleReply.splice(findLangIndex, 1));
	}
})();

            const indexOfHandle = handleReply.findIndex(e => e.messageID == messageReply.messageID);
            if (indexOfHandle < 0) return;
            const indexOfMessage = handleReply[indexOfHandle];
            const handleNeedExec = commands.get(indexOfMessage.name);
          const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

//ADT START
if (!threadSetting.hasOwnProperty('lang')) threadSetting.lang = global.config.language;
var getText = function (...args) {
	const langText = global.languageADT[threadSetting.lang];
	if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
	var text = langText[args[0]][args[1]];
	for (var i = args.length - 1; i > 0; i--) {
		const regEx = RegExp(`%${i}`, 'g');
		text = text.replace(regEx, args[i + 1]);
	}
	return text;
}
//ADT END
            if (!handleNeedExec) return api.sendMessage(getText('handleReply', 'missingValue'), threadID, messageID);
            try {
                var getText2;
                if (handleNeedExec.languages && typeof handleNeedExec.languages == 'object') 
                	getText2 = (...value) => {
                    const reply = handleNeedExec.languages || {};
                    if (!reply.hasOwnProperty(global.config.language)) 
                    	return api.sendMessage(getText('handleCommand', 'notFoundLanguage', handleNeedExec.config.name), threadID, messengeID);
                    var lang = handleNeedExec.languages[global.config.language][value[0]] || '';
                    for (var i = value.length; i > -0x4 * 0x4db + 0x6d * 0x55 + -0x597 * 0x3; i--) {
                        const expReg = RegExp('%' + i, 'g');
                        lang = lang.replace(expReg, value[i]);
                    }
                    return lang;
                };
                else getText2 = () => {};
                const Obj = {};
                Obj.api = api
                Obj.event = event 
                Obj.models = models
                Obj.Users = Users
                Obj.Threads = Threads 
                Obj.Currencies = Currencies
                Obj.handleReply = indexOfMessage
                Obj.models = models
                Obj.getText = getText2
                handleNeedExec.handleReply(Obj);
                return;
            } catch (error) {
                return api.sendMessage(getText('handleReply', 'executeError', error), threadID, messageID);
            }
        }
    };
}