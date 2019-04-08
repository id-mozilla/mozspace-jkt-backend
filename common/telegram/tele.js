const TelegramBot = require('node-telegram-bot-api');

const token = '782076025:AAF_oyQlg-dbnBbHtUHDK1JPlG4m4sKVVN0'; // need token bot chat
const chatId = "336960359" // chat id group telegram

const bot = new TelegramBot(token, {polling: true});

const teleBot = (cMsg) => {
    console.log('send msg to telegram ...');
    bot.sendMessage(chatId, cMsg);
}

module.exports = {teleBot : teleBot};
