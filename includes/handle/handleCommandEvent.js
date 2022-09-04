module.exports = function ({ api, models, Users, Threads, Currencies }) {
    const logger = require("../../utils/log.js")
    return function ({ event }) {
        const { allowInbox } = global.config;
        const { userBanned, threadBanned } = global.data;
        const { commands, eventRegistered } = global.client;
        var { senderID, threadID } = event;
        var senderID = String(senderID);
        var threadID = String(threadID);
        if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == !![] && senderID == threadID) return;
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
        for (const eventReg of eventRegistered) {
            const cmd = commands.get(eventReg);
            var getText2;

            if (cmd.languages && typeof cmd.languages == 'object') 
                getText2 = (...values) => {
                const commandModule = cmd.languages || {};
                if (!commandModule.hasOwnProperty(global.config.language)) 
                    return api.sendMessage(getText('handleCommand','notFoundLanguage', cmd.config.name), threadID, messengeID); 
                var lang = cmd.languages[global.config.language][values[0]] || '';
                for (var i = values.length; i > 0x16c0 + -0x303 + -0x1f * 0xa3; i--) {
                    const expReg = RegExp('%' + i, 'g');
                    lang = lang.replace(expReg, values[i]);
                }
                return lang;
            };
            else getText2 = () => {};
            try {
                const Obj = {};
                Obj.event = event 
                Obj.api = api
                Obj.models = models
                Obj.Users = Users
                Obj.Threads = Threads 
                Obj.Currencies = Currencies 
                Obj.getText = getText2;
                if (cmd) cmd.handleEvent(Obj);
            } catch (error) {
                logger(getText('handleCommandEvent', 'moduleError', cmd.config.name), 'error');
            }
        }
    };
};